# BreedImage (DB)
#     ↓
# si existe → return
#     ↓
# si no:
#     Wikipedia search
#         ↓
#     download_image()
#         ↓
#     save in MEDIA
#         ↓
#     save in DB
#         ↓
#     return path

from dogapp.models import BreedImage
from dogapp.services.images.image_download_service import download_image
from dogapp.services.images.image_search_service import search_wikipedia_image


def get_or_create_image(breed_id, breed_name):

    # Buscar en DB
    image = BreedImage.objects.filter(breed_id=breed_id).first()
    if image:
        return image.image_path

    # Buscar URL externa
    url = search_wikipedia_image(breed_name)
    if not url:
        return None

    # Descargar
    local_path = download_image(url, breed_id)
    if not local_path:
        return None

    # Guardar en DB
    BreedImage.objects.create(
        breed_id=breed_id, breed_name=breed_name, image_path=local_path
    )
    return local_path
