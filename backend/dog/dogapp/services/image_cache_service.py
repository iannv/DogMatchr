import json
from pathlib import Path
from django.conf import settings

CACHE_FILE = Path(settings.BASE_DIR) / "cache" / "breed_images.json"


# breed_images.json -> diccionario de python
def load_cache():
    if not CACHE_FILE.exists():
        return {}

    with open(CACHE_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


# diccionario -> breed_images.json
def save_cache(cache):
    with open(CACHE_FILE, "w", encoding="utf-8") as file:
        json.dump(cache, file, indent=4)


def get_cached_image(breed_id):
    cache = load_cache()
    return cache.get(str(breed_id))


def set_cached_image(breed_id, image_path):
    print("CACHE FILE:", CACHE_FILE)
    print("EXISTS:", CACHE_FILE.exists())

    cache = load_cache()
    cache[str(breed_id)] = image_path
    save_cache(cache)


# ARQUITECTURA

# TheDogAPI
# ↓
# Obtengo raza
# ↓
# image_cache_service
# ↓
# Existe?
# ↓
# SI → devolver
# NO → buscar imagen
