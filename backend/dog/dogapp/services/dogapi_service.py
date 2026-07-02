from django.conf import settings
import requests

THE_DOG_KEY = settings.THE_DOG_KEY
BASE_URL = "https://api.thedogapi.com/v1"
HEADERS = {"x-api-key": THE_DOG_KEY}


# Obtener listado de todas las razas
# https://api.thedogapi.com/v1/images/BJa4kxc4X
IMAGE_CACHE = {}
# def get_image_url(_):
#     return "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"


def get_image_url(reference_image_id):
    if not reference_image_id:
        return None

    url = f"https://api.thedogapi.com/v1/images/{reference_image_id}"
    res = requests.get(url, headers=HEADERS)

    if res.status_code != 200:
        return None

    data = res.json()
    return data.get("url")


def getRazas():
    url = f"{BASE_URL}/breeds"
    response = requests.get(url, headers=HEADERS)

    if response.status_code != 200:
        return []

    breeds = response.json()

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
            "reference_image_id": b.get("reference_image_id"),
        }
        for b in breeds
    ]
    
    
    
    
    # def getRazas():
    url = f"{BASE_URL}/breeds"
    response = requests.get(url, headers=HEADERS)

    if response.status_code != 200:
        return []

    breeds = response.json()

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
            "image_url": None,  # 👈 clave para estabilizar
        }
        for b in breeds
    ]

    # def getRazas():
    urlApi = "https://api.thedogapi.com/v1/breeds"
    headers = {"x-api-key": THE_DOG_KEY}
    response = requests.get(urlApi, headers=headers)
    return response.json()


# Obtener una raza por su ID
# def getRaza(id):
#     urlApi = f"https://api.thedogapi.com/v1/breeds/{id}"
#     response = requests.get(urlApi)
#     return response.json()


# Buscar una raza específica
def getRaza(nombre):
    urlApi = f"https://api.thedogapi.com/v1/breeds/search?q={nombre}"
    headers = {"x-api-key": THE_DOG_KEY}
    response = requests.get(urlApi, headers=headers)
    return response.json()


# Obtener una raza por grupo
def getRazaGrupo(param1):
    urlApi = f"https://api.thedogapi.com/v1/breeds?breed_groups={param1}"
    headers = {"x-api-key": THE_DOG_KEY}
    response = requests.get(urlApi, headers=headers)
    return response.json()
