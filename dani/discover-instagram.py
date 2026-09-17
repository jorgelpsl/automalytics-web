#!/usr/bin/env python3
"""
Dani — descubridor de cuentas de Instagram por rubro/ciudad (sin login, sin Apify).

Uso:
  python discover-instagram.py "<rubro>" "<ciudad, pais>" [maxCandidatos]

Ej:
  python discover-instagram.py "peluqueria" "Temuco, Chile" 15

Instagram no tiene una búsqueda pública scrapeable (su buscador real vive
detrás de sesión iniciada) — este script no intenta scrapear ESO. En vez de
eso, usa un buscador público (DuckDuckGo) para encontrar URLs de
instagram.com que mencionan el rubro y la ciudad, y reutiliza fetch_profile()
de instagram_common.py — el mismo motor que ya usa scrape-instagram.py —
para visitar cada perfil candidato y sacarle bio/teléfono/seguidores.

En otras palabras: reemplaza el paso manual de "buscar cuentas a mano en la
app o por hashtags" que pedía scrape-instagram.py. El resto del flujo es
igual (revisar resultados/ a mano, después cargar con load-to-crm.js).

Requiere navegador real para el paso de enriquecimiento (StealthyFetcher) —
correr en tu propia máquina, no en una sesión cloud de Claude. Ver
dani/README.md.

IMPORTANTE: la relevancia de la búsqueda no es perfecta — un resultado puede
ser de otra ciudad, de una cuenta personal (no un negocio), o no tener nada
que ver con el rubro. Cada entrada queda marcada para revisión manual en las
notas — SIEMPRE revisa el JSON en resultados/ antes de cargar al CRM, igual
que con una lista de cuentas armada a mano.
"""

import json
import re
import sys
import urllib.parse
from pathlib import Path

from scrapling.fetchers import Fetcher

from instagram_common import fetch_profile

RESULTADOS_DIR = Path(__file__).parent / "resultados"

# Segmentos de ruta de instagram.com que NO son un perfil de usuario — hay
# que descartarlos al sacar candidatos de los resultados de búsqueda.
NON_PROFILE_PATHS = {
    "p", "reel", "reels", "tv", "explore", "accounts", "stories", "direct",
    "directory", "about", "legal", "developer", "api", "graphql", "embed",
    "web", "invites", "challenge", "",
}


def extract_instagram_username(url: str) -> str | None:
    """Saca el @usuario de una URL de instagram.com, o None si no es un
    perfil (post, reel, hashtag, etc.)."""
    match = re.search(r"instagram\.com/([^/?#]+)", url)
    if not match:
        return None
    username = match.group(1)
    if username.lower() in NON_PROFILE_PATHS:
        return None
    return username


def unwrap_duckduckgo_redirect(href: str) -> str:
    """DuckDuckGo a veces envuelve el link real en /l/?uddg=<url-encoded>
    en vez de linkear directo al resultado — si es así, lo desenvuelve."""
    if "uddg=" not in href:
        return href
    qs = urllib.parse.parse_qs(urllib.parse.urlparse(href).query)
    real = qs.get("uddg", [None])[0]
    return urllib.parse.unquote(real) if real else href


def search_duckduckgo(query: str, limit: int) -> list[str]:
    resp = Fetcher.get(
        "https://html.duckduckgo.com/html/",
        params={"q": query},
        stealthy_headers=True,
        timeout=20,
    )
    # DuckDuckGo cambia de tanto en tanto la clase de sus links de
    # resultado — a.result__a es la actual, con un selector genérico de
    # respaldo (cualquier link que apunte a instagram.com) por si cambia.
    links = resp.css("a.result__a::attr(href)").getall()
    if not links:
        links = resp.css("a[href*='instagram.com']::attr(href)").getall()

    usernames: list[str] = []
    seen: set[str] = set()
    for href in links:
        real_url = unwrap_duckduckgo_redirect(href)
        username = extract_instagram_username(real_url)
        if username and username.lower() not in seen:
            seen.add(username.lower())
            usernames.append(username)
        if len(usernames) >= limit:
            break
    return usernames


def main():
    if len(sys.argv) < 3:
        print('Uso: python discover-instagram.py "<rubro>" "<ciudad, pais>" [maxCandidatos]')
        sys.exit(1)

    category = sys.argv[1]
    location = sys.argv[2]
    max_candidates = int(sys.argv[3]) if len(sys.argv) > 3 else 15

    query = f'site:instagram.com "{category}" "{location}"'
    print(f'Buscando cuentas de Instagram para "{category}" en "{location}"...')
    print(f"  Consultando DuckDuckGo: {query}")

    try:
        usernames = search_duckduckgo(query, max_candidates * 2)
    except Exception as e:
        print(f"Error buscando en DuckDuckGo: {e}")
        sys.exit(1)

    if not usernames:
        print(
            "Aviso: no se encontró ningún link a instagram.com en los resultados. Es probable "
            "que DuckDuckGo haya cambiado el HTML de resultados (ver search_duckduckgo en este "
            "script), o que la búsqueda sea muy específica — prueba con un rubro/ciudad más genérico."
        )
        sys.exit(1)

    print(f"  -> {len(usernames)} cuentas candidatas: {', '.join('@' + u for u in usernames)}")
    print("  Visitando cada perfil para sacar bio/teléfono/seguidores...")

    candidates = usernames[:max_candidates]
    prospects = []
    for i, username in enumerate(candidates):
        print(f"  {i + 1}/{len(candidates)}: @{username}...")
        try:
            profile = fetch_profile(username)
        except Exception as e:
            print(f"    (fallo al abrir el perfil, se omite: {e})")
            continue
        if not profile:
            print("    (perfil no encontrado, privado, o Instagram bloqueó el request — se omite)")
            continue

        notes = f"{profile['bio']} Instagram: instagram.com/{username}"
        if profile["followers"]:
            notes += f" (~{profile['followers']} seguidores)"
        notes += (
            f'. Encontrado por búsqueda automática para "{category}" en "{location}" — '
            "VERIFICAR manualmente que sea del rubro y ciudad correctos antes de cargar."
        )
        if profile["phone"]:
            notes += " Tiene teléfono en la bio — priorizar llamada directa."

        prospects.append(
            {
                "businessName": profile["fullName"],
                "phone": profile["phone"] or f"IG: @{username}",
                "industry": category,
                "notes": notes,
                "source": "Dani - Instagram (búsqueda automática)",
            }
        )

    print(f"-> {len(prospects)} de {len(candidates)} perfiles procesados correctamente.")

    RESULTADOS_DIR.mkdir(exist_ok=True)
    slug = re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", f"ig-discover-{category}-{location}".lower()))
    out_path = RESULTADOS_DIR / f"{slug}.json"
    out_path.write_text(json.dumps(prospects, indent=2, ensure_ascii=False))

    print(f"Guardado: {out_path}")
    print(
        "IMPORTANTE: revisa cada entrada a mano — la búsqueda no garantiza que sean del rubro/"
        "ciudad correctos, ni que sean negocios (pueden ser cuentas personales). Descarta lo que "
        "no calce antes de cargar."
    )
    print(f"Siguiente paso: cd ../clientes-apify && node load-to-crm.js ../dani/{out_path.relative_to(RESULTADOS_DIR.parent)}")


if __name__ == "__main__":
    main()
