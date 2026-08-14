from django.conf import settings
import requests
from dogapp.services.images.image_search_service import get_image_path
from dogapp.models import BreedImage

THE_DOG_KEY = settings.THE_DOG_KEY
BASE_URL = "https://api.thedogapi.com/v1"
HEADERS = {"x-api-key": THE_DOG_KEY}


# Obtener listado de todas las razas
def getRazas():
    urlApi = "https://api.thedogapi.com/v1/breeds"
    headers = {"x-api-key": THE_DOG_KEY}
    response = requests.get(urlApi, headers=headers)

    if response.status_code != 200:
        return []
    breeds = response.json()

    # print(f"TheDogAPI devolvió {len(breeds)} razas")

    return [
        {
            "id": b.get("id"),
            "name": b.get("name"),
            "breed_group": b.get("breed_group"),
            "life_span": b.get("life_span"),
            "temperament": b.get("temperament"),
            "origin": b.get("origin"),
            "description": b.get("description"),
            "history": b.get("history"),
            "image_url": f"http://127.0.0.1:8000{get_image_path(b.get('id'))}",
        }
        for b in breeds
    ]


# Obtener una raza por su ID
def getRaza(id):
    urlApi = f"https://api.thedogapi.com/v1/breeds/{id}"
    response = requests.get(urlApi)
    return response.json()


# Buscar una raza específica
def getRaza(nombre):
    urlApi = f"https://api.thedogapi.com/v1/breeds/search?q={nombre}"
    headers = {"x-api-key": THE_DOG_KEY}
    response = requests.get(urlApi, headers=headers)
    razas = response.json()

    if not razas:
        return []
    for raza in razas:
        breed_id = raza["id"]
        imagen = BreedImage.objects.filter(breed_id=breed_id).first()
        if imagen:
            raza["image_url"] = f"http://127.0.0.1:8000{imagen.image_path}"
    return razas


# Obtener una raza por grupo
def getRazaGrupo(param1):
    urlApi = f"https://api.thedogapi.com/v1/breeds?breed_groups={param1}"
    headers = {"x-api-key": THE_DOG_KEY}
    response = requests.get(urlApi, headers=headers)
    return response.json()
