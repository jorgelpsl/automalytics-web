"""Funciones compartidas para visitar perfiles de Instagram con Scrapling.

Usado tanto por scrape-instagram.py (cuando ya tienes la lista de usuarios)
como por discover-instagram.py (cuando Dani busca las cuentas por ti) — el
paso de "abrir el perfil y sacarle los datos" es el mismo en los dos casos.
"""

import re

from scrapling.fetchers import StealthyFetcher

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
