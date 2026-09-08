#!/usr/bin/env python3
"""
Dani — extractor de datos de perfiles de Instagram (sin Apify).

Uso:
  python scrape-instagram.py "<categoria>" <usuario1,usuario2,...>

Ej:
  python scrape-instagram.py "peluqueria" "peluqueria_temuco,estudio_capilar_cl"

A diferencia de scrape-google-maps.py, este script NO busca por categoría/
ciudad directamente — Instagram no expone una búsqueda pública fácil de
scrapear de forma confiable (su buscador real vive detrás de sesión
iniciada). Así que el descubrimiento de cuentas (buscar en Instagram a
mano, revisar hashtags, etc.) lo haces tú, y este script se encarga de
visitar cada perfil y sacarle los datos (bio, teléfono si está en la bio,
seguidores) para cargarlos al CRM.

Requiere navegador real (Scrapling StealthyFetcher) — correr en tu propia
máquina, no en una sesión cloud de Claude. Ver dani/README.md.

Instagram no muestra tu app como "logueada" para ver un perfil público,
pero SÍ le pone un techo a cuántos perfiles puedes ver sin iniciar sesión
en poco tiempo — si empieza a fallar todo de golpe, espera un rato entre
tandas.
"""

import json
import re
import sys
from pathlib import Path

from scrapling.fetchers import StealthyFetcher

RESULTADOS_DIR = Path(__file__).parent / "resultados"

PHONE_REGEX = re.compile(r"(?:\+?56\s?)?9\s?\d{4}\s?\d{4}|\+\d{9,14}")

ACTION_NOTE = (
    "Contactar por mensaje directo de Instagram si no hay teléfono. Verificar si tienen "
    "WhatsApp para contactar por ahí también. Revisar la bio: si tienen link a página web, "
    'evaluar si es básica/gratuita y "upgradeable" (Linktree, plantilla gratuita, etc.) o si '
    "ya tienen un sitio propio bien armado."
)

# Instagram inyecta seguidores/bio en el meta og:description de la página
# ("N Followers, M Following, K Posts - ... bio real acá") cuando el perfil
# es público y se visita con un navegador de verdad — se cae si Instagram
# cambia ese formato o empieza a exigir sesión iniciada para verlo.
def fetch_profile(username: str) -> dict | None:
    url = f"https://www.instagram.com/{username}/"
    page = StealthyFetcher.fetch(url, headless=True, network_idle=True, timeout=30000)

    og_desc = page.css('meta[property="og:description"]::attr(content)').get()
    title = page.css("title::text").get()

    if not og_desc:
        return None

    # El og:description de Instagram trae el formato:
    # "N Followers, M Following, K Posts - See Instagram photos and videos from NAME (@user)"
    # seguido a veces de la bio real. Se guarda tal cual en notes si no calza
    # el patrón, para no perder información.
    followers_match = re.search(r"([\d.,]+)\s*Followers", og_desc)
    followers = followers_match.group(1) if followers_match else None

    full_name = None
    if title:
        full_name = title.split(" (@")[0].strip()

    phone_match = PHONE_REGEX.search(og_desc)
    real_phone = phone_match.group(0).replace(" ", "") if phone_match else None

    return {
        "username": username,
        "fullName": full_name or username,
        "bio": og_desc,
        "followers": followers,
        "phone": real_phone,
    }


def main():
    if len(sys.argv) < 3:
        print('Uso: python scrape-instagram.py "<categoria>" <usuario1,usuario2,...>')
        sys.exit(1)

    category = sys.argv[1]
    usernames = [u.strip().lstrip("@") for u in sys.argv[2].split(",") if u.strip()]

    if not usernames:
        print("No se recibió ningún usuario.")
        sys.exit(1)

    print(f"Revisando {len(usernames)} perfiles de Instagram para \"{category}\"...")

    prospects = []
    for i, username in enumerate(usernames):
        print(f"  {i + 1}/{len(usernames)}: @{username}...")
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
        notes += "."
        if profile["phone"]:
            notes += " Tiene teléfono en la bio — priorizar llamada directa."
        notes += f" {ACTION_NOTE}"

        prospects.append(
            {
                "businessName": profile["fullName"],
                "phone": profile["phone"] or f"IG: @{username}",
                "industry": category,
                "notes": notes,
                "source": "Dani - Instagram",
            }
        )

    print(f"-> {len(prospects)} de {len(usernames)} perfiles procesados correctamente.")

    RESULTADOS_DIR.mkdir(exist_ok=True)
    slug = re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", f"ig-{category}".lower()))
    out_path = RESULTADOS_DIR / f"{slug}.json"
    out_path.write_text(json.dumps(prospects, indent=2, ensure_ascii=False))

    print(f"Guardado: {out_path} — revísalos a mano antes de cargar (rubro/país no se filtran automáticamente)")
    print(f"Siguiente paso: cd ../clientes-apify && node load-to-crm.js ../dani/{out_path.relative_to(RESULTADOS_DIR.parent)}")


if __name__ == "__main__":
    main()
