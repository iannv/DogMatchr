from pathlib import Path
from django.conf import settings
from django.core.management.base import BaseCommand
from dogapp.services.dogapi_service import getRazas
from dogapp.models import BreedImage

DOGS_FOLDER = Path(settings.MEDIA_ROOT) / "dogs"


class Command(BaseCommand):
    help = "Sincroniza las imágenes locales con la base de datos."

    def handle(self, *args, **options):
        sincronizadas = 0
        self.stdout.write("Sincronizando imágenes...")
        razas = getRazas()
        self.stdout.write(f"Se encontraron {len(razas)} razas.")

        for raza in razas:
            breed_id = raza["id"]

            for extension in ["jpg", "jpeg", "png", "webp"]:
                image_path = DOGS_FOLDER / f"{breed_id}.{extension}"

                if image_path.exists():
                    BreedImage.objects.update_or_create(
                        breed_id=breed_id,
                        defaults={
                            "breed_name": raza["name"],
                            "image_path": f"/media/dogs/{image_path.name}",
                        },
                    )
                    sincronizadas += 1
                    self.stdout.write(f"✔ Sincronizada: {raza['name']}")
                    break

        self.stdout.write(
            self.style.SUCCESS(f"Se sincronizaron {sincronizadas} imágenes")
        )
