import requests
from urllib.parse import quote
from pathlib import Path
from django.conf import settings
from dogapp.models import BreedImage

CACHE_FILE = Path(settings.BASE_DIR) / "cache" / "breed_images.json"
DOGS_FOLDER = Path(settings.MEDIA_ROOT) / "dogs"


# Buscar imagenes en wikipedia
def search_wikipedia_image(breed_name):
    # query = f"{breed_name} dog breed"
    title = quote(breed_name.replace(" ", "_"))
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title}"

    # Consultar en wikipedia
    response = requests.get(url, headers={"User-Agent": "DogMatchr/1.0"})
    if response.status_code != 200:
        return None
    data = response.json()

    # Devolver la imagen
    thumbnail = data.get("thumbnail")
    if thumbnail:
        return thumbnail.get("source")

    return None


# Mostrar imagenes
def get_image_path(breed_id):
    image = BreedImage.objects.filter(breed_id=breed_id).first()
    if image:
        return image.image_path
    return None
