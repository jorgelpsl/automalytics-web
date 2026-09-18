"""Funciones compartidas para visitar perfiles de Instagram con Scrapling.

Usado tanto por scrape-instagram.py (cuando ya tienes la lista de usuarios)
como por discover-instagram.py (cuando Dani busca las cuentas por ti) — el
paso de "abrir el perfil y sacarle los datos" es el mismo en los dos casos.
"""

import json
import re

from scrapling.fetchers import Fetcher, StealthyFetcher

PHONE_REGEX = re.compile(r"(?:\+?56\s?)?9\s?\d{4}\s?\d{4}|\+\d{9,14}")

ACTION_NOTE = (
    "Contactar por mensaje directo de Instagram si no hay teléfono. Verificar si tienen "
    "WhatsApp para contactar por ahí también. Revisar la bio: si tienen link a página web, "
    'evaluar si es básica/gratuita y "upgradeable" (Linktree, plantilla gratuita, etc.) o si '
    "ya tienen un sitio propio bien armado."
)

# App id que el propio frontend de instagram.com manda en cada carga de
# página — es público (viaja en el HTML de cualquier visita normal), no una
# credencial. Se necesita para que el endpoint JSON no rebote la consulta.
INSTAGRAM_APP_ID = "936619743392459"


def _extract_city_hint(business_address_json: str | None) -> str | None:
    """business_address_json viene, cuando existe, como un JSON *dentro* de
    otro JSON (un string que a su vez hay que parsear) — solo lo llenan las
    cuentas profesionales que cargaron su dirección, así que la mayoría no
    lo va a traer."""
    if not business_address_json:
        return None
    try:
        address = json.loads(business_address_json)
    except json.JSONDecodeError:
        return None
    return address.get("city_name") or None


# Endpoint JSON público que usa el propio frontend de instagram.com para
# pintar el perfil — no necesita sesión iniciada para cuentas públicas (al
# menos hasta ahora; Instagram lo ha ido restringiendo con el tiempo). Trae
# campos que el og:description no separa: el link real del botón "Sitio
# web" (externalUrl, distinto de un link mencionado en el texto de la bio),
# la categoría del negocio, y la dirección declarada (si la cargaron).
#
# Devuelve None si el endpoint no responde como se espera (401, formato
# cambiado, etc.) — en ese caso el caller (fetch_profile) cae a
# fetch_profile_browser, que sigue funcionando pero con menos campos.
def fetch_profile_api(username: str) -> dict | None:
    url = "https://www.instagram.com/api/v1/users/web_profile_info/"
    try:
        resp = Fetcher.get(
            url,
            params={"username": username},
            headers={
                "x-ig-app-id": INSTAGRAM_APP_ID,
                "Accept": "*/*",
                "Referer": f"https://www.instagram.com/{username}/",
            },
            impersonate="chrome",
            timeout=20,
        )
    except Exception:
        return None

    if resp.status != 200:
        return None

    try:
        user = resp.json()["data"]["user"]
    except (ValueError, KeyError, TypeError):
        return None
    if not user:
        return None

    bio = user.get("biography") or ""
    phone = user.get("business_phone_number") or None
    if not phone:
        phone_match = PHONE_REGEX.search(bio)
        phone = phone_match.group(0).replace(" ", "") if phone_match else None

    followers = (user.get("edge_followed_by") or {}).get("count")
    external_url = user.get("external_url") or None

    return {
        "username": username,
        "fullName": user.get("full_name") or username,
        "bio": bio,
        "followers": str(followers) if followers is not None else None,
        "phone": phone,
        "externalUrl": external_url,
        "cityHint": _extract_city_hint(user.get("business_address_json")),
        "categoryName": user.get("category_name") or None,
        # Solo lo marcamos True/False cuando sabemos de verdad (llegamos
        # hasta acá) — si el endpoint falla, hasNoWebsite queda en None en
        # vez de asumir cualquiera de los dos.
        "hasNoWebsite": not bool(external_url),
    }


# Método anterior (og:description) — sirve de respaldo cuando el endpoint
# JSON no responde. Instagram inyecta seguidores/bio en el meta
# og:description de la página ("N Followers, M Following, K Posts - ...
# bio real acá") cuando el perfil es público y se visita con un navegador
# de verdad — se cae si Instagram cambia ese formato o empieza a exigir
# sesión iniciada para verlo también.
def fetch_profile_browser(username: str) -> dict | None:
    url = f"https://www.instagram.com/{username}/"
    page = StealthyFetcher.fetch(url, headless=True, network_idle=True, timeout=30000)

    og_desc = page.css('meta[property="og:description"]::attr(content)').get()
    title = page.css("title::text").get()

    if not og_desc:
        return None

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
        "externalUrl": None,
        "cityHint": None,
        "categoryName": None,
        "hasNoWebsite": None,
    }


# Punto de entrada que usan scrape-instagram.py y discover-instagram.py.
# Intenta primero el endpoint JSON (más rápido — sin navegador — y con más
# campos) y solo si falla cae al método por navegador.
def fetch_profile(username: str) -> dict | None:
    return fetch_profile_api(username) or fetch_profile_browser(username)


# Arma la entrada lista para resultados/<archivo>.json a partir de un
# profile de fetch_profile() — compartido por scrape-instagram.py y
# discover-instagram.py para que las notas no se desincronicen entre los
# dos scripts. extra_note es para el aviso propio de discover-instagram.py
# ("encontrado por búsqueda automática, verificar rubro/ciudad").
def build_prospect(profile: dict, username: str, category: str, source: str, extra_note: str | None = None) -> dict:
    notes = f"{profile['bio']} Instagram: instagram.com/{username}"
    if profile.get("followers"):
        notes += f" (~{profile['followers']} seguidores)"
    notes += "."

    if profile.get("categoryName"):
        notes += f" Categoría en Instagram: {profile['categoryName']}."
    if profile.get("externalUrl"):
        notes += f" Sitio web propio (botón del perfil): {profile['externalUrl']}."
    if profile.get("cityHint"):
        notes += f" Ubicación declarada en Instagram: {profile['cityHint']} — verificar que corresponda."
    if profile.get("phone"):
        notes += " Tiene teléfono en la bio — priorizar llamada directa."
    if extra_note:
        notes += f" {extra_note}"
    notes += f" {ACTION_NOTE}"

    prospect = {
        "businessName": profile["fullName"],
        "phone": profile["phone"] or f"IG: @{username}",
        "industry": category,
        "notes": notes,
        "source": source,
    }
    # Solo se agregan cuando el endpoint JSON los pudo confirmar — si vino
    # del método por navegador (fallback), profile["hasNoWebsite"] es None
    # y no se toca ninguno de los dos, igual que antes de este cambio.
    if profile.get("externalUrl"):
        prospect["website"] = profile["externalUrl"]
    if profile.get("hasNoWebsite") is not None:
        prospect["hasNoWebsite"] = profile["hasNoWebsite"]
    return prospect
