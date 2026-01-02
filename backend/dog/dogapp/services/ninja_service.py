from django.conf import settings
import requests

NINJA_DOG_KEY = settings.NINJA_DOG_KEY

# Obtener datos de la raza
def getRaza(nombre):
    urlApi = f"https://api.api-ninjas.com/v1/dogs?name={nombre}"
    headers = {"x-api-key": NINJA_DOG_KEY}
    response = requests.get(urlApi, headers=headers)
    return response.json()

def getFiltrosAvanzados(filtros: dict):
    urlApi = "https://api.api-ninjas.com/v1/dogs"
    headers = {"x-api-key": NINJA_DOG_KEY}
    response = requests.get(urlApi, headers=headers, params=filtros)
    return response.json()
