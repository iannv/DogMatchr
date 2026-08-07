from django.conf import settings
import requests
from dogapp.models import BreedNinja

NINJA_DOG_KEY = settings.NINJA_DOG_KEY


# Obtener datos de la raza
def getRaza(nombre):
    # urlApi = f"https://api.api-ninjas.com/v1/dogs?name={nombre}"
    # headers = {"x-api-key": NINJA_DOG_KEY}
    # response = requests.get(urlApi, headers=headers)
    raza = BreedNinja.objects.filter(name=nombre).first()

    if not raza:
        return []
    return [
        {
            "name": raza.name,
            "image_link": raza.image_link,
            "good_with_children": raza.good_with_children,
            "good_with_other_dogs": raza.good_with_other_dogs,
            "shedding": raza.shedding,
            "grooming": raza.grooming,
            "drooling": raza.drooling,
            "coat_length": raza.coat_length,
            "good_with_strangers": raza.good_with_strangers,
            "playfulness": raza.playfulness,
            "protectiveness": raza.protectiveness,
            "trainability": raza.trainability,
            "energy": raza.energy,
            "barking": raza.barking,
            "min_life_expectancy": raza.min_life_expectancy,
            "max_life_expectancy": raza.max_life_expectancy,
            "max_height_male": raza.max_height_male,
            "max_height_female": raza.max_height_female,
            "max_weight_male": raza.max_weight_male,
            "max_weight_female": raza.max_weight_female,
            "min_height_male": raza.min_height_male,
            "min_height_female": raza.min_height_female,
            "min_weight_male": raza.min_weight_male,
            "min_weight_female": raza.min_weight_female,
        }
    ]
