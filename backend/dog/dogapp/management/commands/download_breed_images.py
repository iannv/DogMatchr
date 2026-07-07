from pathlib import Path
import time
from django.conf import settings
from django.core.management.base import BaseCommand
from dogapp.services.dogapi_service import getRazas
from dogapp.services.images import image_search_service, image_download_service

DOGS_FOLDER = Path(settings.MEDIA_ROOT) / "dogs"


class Command(BaseCommand):
    help = "Descarga las imágenes de las razas que aún no existen en media."

    def handle(self, *args, **options):
        for raza in getRazas():
            breed_id = raza["id"]
            existe = False

            for extension in ["jpg", "jpeg", "png", "webp"]:
                image_path = DOGS_FOLDER / f"{breed_id}.{extension}"
                if image_path.exists():
                    existe = True
                    break

            if existe:
                self.stdout.write(f"✔ Ya existe: {raza['name']}")
                continue

            url = image_search_service.search_wikipedia_image(raza["name"])
            if not url:
                self.stdout.write(f"❌ No encontrada: {raza['name']}")
                
                with open('missing_images.txt', 'a', encoding="utf-8") as file:
                    file.write(f"{raza['id']} - {raza['name']}\n")
                continue

            image_download_service.download_image(url, breed_id)
            
            self.stdout.write(f"Descargada: {raza['name']}")
