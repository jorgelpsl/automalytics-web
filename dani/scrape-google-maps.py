#!/usr/bin/env python3
"""
Dani — buscador de prospectos en Google Maps (sin Apify).

Uso:
  python scrape-google-maps.py "<categoria>" "<ciudad, pais>" [maxResultados]

Ej:
  python scrape-google-maps.py "clinica dental" "Temuco, Chile" 30

Requiere navegador real (Scrapling StealthyFetcher, sobre Chromium) porque
los resultados de Google Maps se cargan por JavaScript — no existe una
versión "solo HTML" que los muestre. Por eso este script está pensado para
correr en tu propia máquina, NO dentro de una sesión cloud de Claude (los
proxies de seguridad de esas sesiones bloquean tráfico con huella de
navegador). Ver dani/README.md.

IMPORTANTE — a diferencia del actor de Apify (mantenido por un equipo
dedicado), estos selectores son clases de Google que cambian de tanto en
tanto. Si un día deja de traer resultados, lo más probable es que Google
haya cambiado el HTML — avísame (o revisa con el navegador visible,
headless=False) para actualizar los selectores.
"""

import json
import re
import sys
import time
import urllib.parse
from pathlib import Path

from scrapling.fetchers import StealthyFetcher

RESULTADOS_DIR = Path(__file__).parent / "resultados"

# Clases/atributos que Google usa hoy para las tarjetas de resultado y el
# panel de detalle. Son inestables por diseño (Google las regenera), así
# que cada selector trae una alternativa más genérica como respaldo.
CARD_LINK_SELECTORS = ['a.hfpxzc', 'div[role="feed"] > div > a']
NAME_ATTR = "aria-label"  # el nombre del negocio va en el aria-label del link de la tarjeta

DETAIL_NAME_SELECTORS = ["h1.DUwDvf::text", "h1.DUwDvf ::text"]
DETAIL_PHONE_SELECTORS = ['button[data-item-id^="phone"]::attr(data-item-id)']
DETAIL_WEBSITE_SELECTORS = ['a[data-item-id="authority"]::attr(href)']
DETAIL_ADDRESS_SELECTORS = ['button[data-item-id="address"]::attr(aria-label)']
DETAIL_RATING_SELECTORS = ["div.F7nice span:first-child::text"]
DETAIL_REVIEWS_SELECTORS = ["div.F7nice span:nth-child(2)::text"]


def has_real_website(url: str | None) -> bool:
    if not url:
        return False
    url = url.lower()
    return not any(x in url for x in ("facebook.com", "instagram.com", "linktr.ee"))


def scroll_feed(page, times: int = 6, pause_ms: int = 1200):
    """Scrollea el panel de resultados (izquierda) para que Maps cargue más tarjetas.

    Se manipula scrollTop directamente en vez de simular la rueda del mouse
    porque el wheel de Playwright scrollea lo que esté bajo el cursor, y el
    cursor arranca en (0,0) — fuera del panel de resultados.
    """
    for _ in range(times):
        page.evaluate(
            """() => {
                const feed = document.querySelector('div[role="feed"]');
                if (feed) feed.scrollTop = feed.scrollHeight;
            }"""
        )
        page.wait_for_timeout(pause_ms)


def collect_card_links(page_selector, limit: int) -> list[dict]:
    for sel in CARD_LINK_SELECTORS:
        cards = page_selector.css(sel)
        if cards:
            break
    else:
        cards = []

    out = []
    seen = set()
    for card in cards:
        href = card.attrib.get("href")
        name = card.attrib.get(NAME_ATTR)
        if not href or not name or href in seen:
            continue
        seen.add(href)
        out.append({"name": name, "url": href})
        if len(out) >= limit:
            break
    return out


def first_text(selector_result, selectors: list[str]) -> str | None:
    for sel in selectors:
        val = selector_result.css(sel).get()
        if val:
            return val.strip()
    return None


def fetch_place_detail(url: str) -> dict:
    page = StealthyFetcher.fetch(url, headless=True, network_idle=True, timeout=30000)
    phone_raw = first_text(page, DETAIL_PHONE_SELECTORS)  # viene como "phone:+56912345678"
    phone = phone_raw.split(":", 1)[1] if phone_raw and ":" in phone_raw else phone_raw
    website = first_text(page, DETAIL_WEBSITE_SELECTORS)
    address = first_text(page, DETAIL_ADDRESS_SELECTORS)
    rating = first_text(page, DETAIL_RATING_SELECTORS)
    reviews_raw = first_text(page, DETAIL_REVIEWS_SELECTORS)
    reviews = re.sub(r"[^\d]", "", reviews_raw) if reviews_raw else None
    return {"phone": phone, "website": website, "address": address, "rating": rating, "reviews": reviews}


def main():
    if len(sys.argv) < 3:
        print('Uso: python scrape-google-maps.py "<categoria>" "<ciudad, pais>" [maxResultados]')
        sys.exit(1)

    category = sys.argv[1]
    location = sys.argv[2]
    max_results = int(sys.argv[3]) if len(sys.argv) > 3 else 30

    query = f"{category} {location}"
    search_url = f"https://www.google.com/maps/search/{urllib.parse.quote(query)}?hl=es"

    print(f'Buscando "{category}" en "{location}" — objetivo: {max_results} negocios sin sitio web...')
    print("  Abriendo Google Maps y scrolleando resultados...")

    # Pedimos bastantes más tarjetas que max_results porque la mayoría de
    # los negocios SÍ tienen sitio propio y se van a descartar — igual que
    # hace scrape-google-maps.js con el actor de Apify.
    crawl_target = max(max_results * 3, 40)

    def page_action(page):
        scroll_feed(page, times=8)
        return page

    search_page = StealthyFetcher.fetch(
        search_url,
        headless=True,
        network_idle=True,
        timeout=45000,
        page_action=page_action,
    )

    cards = collect_card_links(search_page, crawl_target)
    print(f"  -> {len(cards)} tarjetas encontradas en el panel de resultados.")

    if not cards:
        print(
            "Aviso: no se encontró ninguna tarjeta de resultado. Es probable que Google haya "
            "cambiado el HTML (ver CARD_LINK_SELECTORS en este script) — corre con headless=False "
            "para revisar visualmente, o avísame el HTML actual para actualizar los selectores."
        )
        sys.exit(1)

    qualifying = []
    for i, card in enumerate(cards):
        if len(qualifying) >= max_results:
            break
        print(f"  Revisando {i + 1}/{len(cards)}: {card['name']}...")
        try:
            detail = fetch_place_detail(card["url"])
        except Exception as e:
            print(f"    (fallo al abrir detalle, se omite: {e})")
            continue

        if not detail["phone"] or has_real_website(detail["website"]):
            continue

        notes_parts = [detail["address"] or location]
        if detail["website"]:
            notes_parts.append(f"Solo tiene: {detail['website']}")
        else:
            notes_parts.append("Sin sitio web.")
        if detail["rating"]:
            notes_parts.append(f"Rating: {detail['rating']} ({detail['reviews'] or 0} reseñas).")

        qualifying.append(
            {
                "businessName": card["name"],
                "phone": re.sub(r"\s+", "", detail["phone"]),
                "industry": category,
                "notes": " ".join(notes_parts),
                "source": "Dani - Google Maps",
                "hasNoWebsite": True,
            }
        )
        time.sleep(0.5)  # no golpear Maps sin pausa entre detalle y detalle

    print(f"  -> {len(qualifying)} califican (sin sitio propio, con teléfono).")
    if len(qualifying) < max_results:
        print(
            f"Aviso: solo se encontraron {len(qualifying)} de los {max_results} pedidos — "
            "sube crawl_target o revisa manualmente si Maps tiene más resultados para esta búsqueda."
        )

    RESULTADOS_DIR.mkdir(exist_ok=True)
    slug = re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", f"{category}-{location}".lower()))
    out_path = RESULTADOS_DIR / f"{slug}.json"
    out_path.write_text(json.dumps(qualifying, indent=2, ensure_ascii=False))

    print(f"Guardado: {out_path} ({len(qualifying)} de {max_results} pedidos, listos para cargar)")
    print(f"Siguiente paso: cd ../clientes-apify && node load-to-crm.js ../dani/{out_path.relative_to(RESULTADOS_DIR.parent)}")


if __name__ == "__main__":
    main()
