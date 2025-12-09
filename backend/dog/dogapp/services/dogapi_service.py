from django.conf import settings
import requests

THE_DOG_KEY = settings.THE_DOG_KEY


# Obtener listado de todas las razas
def getRazas():
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
