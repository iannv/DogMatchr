import requests, time
from pathlib import Path
from django.conf import settings

DOGS_FOLDER = Path(settings.MEDIA_ROOT) / "dogs"
DOGS_FOLDER.mkdir(parents=True, exist_ok=True)


def download_image(url, breed_id):
    print("Descargando:", url)

    response = requests.get(
        url, headers={"User-Agent": "DogMatchr/1.0"}
    )  # Descargar img

    print("STATUS:", response.status_code)
    print("CONTENT TYPE:", response.headers.get("Content-Type"))
    
    # Si Wikipedia bloquea solicitudes, esperar 5 segundos y reintentar
    if response.status_code == 429:
        print("Wikipedia limitó las solicitudes. Reintentando...")
        time.sleep(40)
        response = requests.get(
            url,
            headers={"User-Agent": "DogMatchr/1.0"}
        )
        print("NUEVO STATUS:", response.status_code)

    if response.status_code != 200:
        return None

    extension = url.split(".")[-1]  # Averiguar extensión
    print("EXTENSION:", extension)

    filename = f"{breed_id}.{extension}"  # Crear nombre del archivo

    filepath = DOGS_FOLDER / filename  # Construir la ruta completa
    print("GUARDANDO EN:", filepath)

    with open(filepath, "wb") as file:  # Escribir el archivo
        file.write(response.content)

    print("IMAGEN GUARDADA")
    
    time.sleep(10)

    return f"/media/dogs/{filename}"  # Devolver la ruta al frontend



# AQUITECTURA
# El usuario pide la imagen de la raza 25

#         │
#         ▼

# ¿Existe en el caché?

#    ┌───────────────┐
#    │               │
#   Sí              No
#    │               │
#    ▼               ▼
# Devolver      Buscar imagen
# la ruta        en Internet
#                    │
#                    ▼
#            Descargar imagen
#                    │
#                    ▼
#          Guardar en media/dogs
#                    │
#                    ▼
#       Actualizar breed_images.json
#                    │
#                    ▼
#             Devolver la ruta
