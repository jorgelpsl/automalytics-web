#!/usr/bin/env python3
"""
Dani — extractor de datos de perfiles de Instagram (sin Apify).

Uso:
  python scrape-instagram.py "<categoria>" <usuario1,usuario2,...>

Ej:
  python scrape-instagram.py "peluqueria" "peluqueria_temuco,estudio_capilar_cl"

Este script asume que ya tienes la lista de cuentas (buscando en Instagram a
mano, hashtags del rubro, etc.) y solo visita cada perfil para sacarle los
datos. Si en vez de eso quieres que Dani busque las cuentas por ti, usa
discover-instagram.py — hace lo mismo pero partiendo de un rubro/ciudad en
vez de una lista de usuarios.

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

from instagram_common import build_prospect, fetch_profile

RESULTADOS_DIR = Path(__file__).parent / "resultados"


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

        prospects.append(build_prospect(profile, username, category, source="Dani - Instagram"))

    print(f"-> {len(prospects)} de {len(usernames)} perfiles procesados correctamente.")

    RESULTADOS_DIR.mkdir(exist_ok=True)
    slug = re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", f"ig-{category}".lower()))
    out_path = RESULTADOS_DIR / f"{slug}.json"
    out_path.write_text(json.dumps(prospects, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"Guardado: {out_path} — revísalos a mano antes de cargar (rubro/país no se filtran automáticamente)")
    print(f"Siguiente paso: cd ../clientes-apify && node load-to-crm.js ../dani/{out_path.relative_to(RESULTADOS_DIR.parent)}")


if __name__ == "__main__":
    main()
