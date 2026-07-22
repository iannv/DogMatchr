from pathlib import Path
from django.conf import settings
from django.core.management.base import BaseCommand
from dogapp.services.dogapi_service import getRazas
from dogapp.services.ninja_service import getRaza
from dogapp.models import BreedImage, BreedNinja


class Command(BaseCommand):
    help = "Sincroniza la API de Ninja a la base de datos."

    def handle(self, *args, **options):
        sincronizadas = 0
        existe = False
        self.stdout.write("Sincronizando razas...")
        razas_dogapi = getRazas()
        self.stdout.write(f"Se encontraron {len(razas_dogapi)} razas en TheDogApi.")

        for raza in razas_dogapi:
            breed_id = raza["id"]
            breed_name = raza["name"]
            raza_ninja = getRaza(nombre=breed_name)

            self.stdout.write(f"Raza_ninja: {raza_ninja}")

            if not raza_ninja:
                self.stdout.write(f"❌ No encontrada en Ninja: {breed_name}")
                continue

            raza_ninja = raza_ninja[0]

            BreedNinja.objects.update_or_create(
                breed_id=breed_id,
                defaults={
                    "name": raza_ninja["name"],
                    "image_link": raza_ninja["image_link"],
                    "good_with_children": raza_ninja["good_with_children"],
                    "good_with_other_dogs": raza_ninja["good_with_other_dogs"],
                    "shedding": raza_ninja["shedding"],
                    "grooming": raza_ninja["grooming"],
                    "drooling": raza_ninja["drooling"],
                    "coat_length": raza_ninja["coat_length"],
                    "good_with_strangers": raza_ninja["good_with_strangers"],
                    "playfulness": raza_ninja["playfulness"],
                    "protectiveness": raza_ninja["protectiveness"],
                    "trainability": raza_ninja["trainability"],
                    "energy": raza_ninja["energy"],
                    "barking": raza_ninja["barking"],
                    "min_life_expectancy": raza_ninja["min_life_expectancy"],
                    "max_life_expectancy": raza_ninja["max_life_expectancy"],
                    "max_height_male": raza_ninja["max_height_male"],
                    "max_height_female": raza_ninja["max_height_female"],
                    "max_weight_male": raza_ninja["max_weight_male"],
                    "max_weight_female": raza_ninja["max_weight_female"],
                    "min_height_male": raza_ninja["min_height_male"],
                    "min_height_female": raza_ninja["min_height_female"],
                    "min_weight_male": raza_ninja["min_weight_male"],
                    "min_weight_female": raza_ninja["min_weight_female"],
                },
            )

            sincronizadas += 1
            self.stdout.write(f"✔ Sincronizada: {breed_name}")

    ########################################################################

    #     BreedNinja.objects.update_or_create(
    #         breed_name=breed_name,
    #         defaults={
    #             "name": raza["name"],
    #             "image_link": raza["image_link"],
    #             "good_with_children": raza["good_with_children"],
    #             "good_with_other_dogs": raza["good_with_other_dogs"],
    #             "shedding": raza["shedding"],
    #             "grooming": raza["grooming"],
    #             "drooling": raza["drooling"],
    #             "coat_length": raza["coat_length"],
    #             "good_with_strangers": raza["good_with_strangers"],
    #             "playfulness": raza["playfulness"],
    #             "protectiveness": raza["protectiveness"],
    #             "trainability": raza["trainability"],
    #             "energy": raza["energy"],
    #             "barking": raza["barking"],
    #             "min_life_expectancy": raza["min_life_expectancy"],
    #             "max_life_expectancy": raza["max_life_expectancy"],
    #             "max_height_male": raza["max_height_male"],
    #             "max_height_female": raza["max_height_female"],
    #             "max_weight_male": raza["max_weight_male"],
    #             "max_weight_female": raza["max_weight_female"],
    #             "min_height_male": raza["min_height_male"],
    #             "min_height_female": raza["min_height_female"],
    #             "min_weight_male": raza["min_weight_male"],
    #             "min_weight_female": raza["min_weight_female"],
    #         },
    #     )

    #     sincronizadas += 1
    #     self.stdout.write(f"✔ Sincronizada: {raza['name']}")
    #     break

    # self.stdout.write(self.style.SUCCESS(f"Se sincronizaron {sincronizadas} razas"))
