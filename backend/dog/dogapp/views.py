from django.conf import settings
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from dogapp.services import dogapi_service, ninja_service
from itertools import product

THE_DOG_KEY = settings.THE_DOG_KEY
NINJA_DOG_KEY = settings.NINJA_DOG_KEY


########## DOG API ##########
class RazasView(APIView):
    def get(self, request):
        data = dogapi_service.getRazas()
        return Response(data)


class RazaView(APIView):
    def get(self, request, nombre):
        dogapi = dogapi_service.getRaza(nombre)

        if not dogapi:
            return Response({"error": "No se encontró la raza"}, status=404)
        nombreUnido = dogapi[0]["name"]
        ninja = ninja_service.getRaza(nombreUnido)

        return Response(
            {
                "dogapi": dogapi[0],
                "ninja": ninja,
            }
        )


class RazaGrupoView(APIView):
    def get(self, request):
        param = request.query_params.get("breed_groups", "")
        data = dogapi_service.getRazaGrupo(param)
        return Response(data)


########## NINJA API ##########
class RazaViewNinja(APIView):
    def get(self, request):
        param = request.query_params.get("name", None)
        data = ninja_service.getRaza(param)
        return Response(data)


class FiltrosAvanzadosView(APIView):
    def get(self, request):
        FILTER_MAPS = {
            "energy": {
                "baja": [1, 2],
                "moderada": [3],
                "alta": [4, 5],
            },
            "barking": {
                "baja": [1, 2],
                "moderada": [3],
                "alta": [4, 5],
            },
            "trainability": {
                "no-es-importante": [1, 2],
                "importante": [3],
                "muy-importante": [4, 5],
            },
            "playfulness": {
                "baja": [1, 2],
                "moderada": [3],
                "alta": [4, 5],
            },
            "grooming": {
                "poco": [1, 2],
                "moderado": [3],
                "mucho": [4, 5],
            },
        }
        
        filtros_usuario = {}

        for filtro, mapa in FILTER_MAPS.items():
            valor = request.query_params.get(filtro)
            if valor and valor in mapa:
                filtros_usuario[filtro] = mapa[valor]

        # 2️⃣ Si no hay filtros, devolvemos vacío (o podrías traer todo)
        if not filtros_usuario:
            return Response([])

        # 3️⃣ Generamos todas las combinaciones posibles
        combinaciones = [
            dict(zip(filtros_usuario.keys(), combo))
            for combo in product(*filtros_usuario.values())
        ]

        # 4️⃣ Función para validar realmente los filtros
        def pasa_filtros(raza):
            for filtro, valores in filtros_usuario.items():
                if raza.get(filtro) not in valores:
                    return False
            return True

        # 5️⃣ Ejecutamos consultas y eliminamos duplicados por nombre
        resultados_dict = {}

        for params in combinaciones:
            data = ninja_service.getFiltrosAvanzados(params)

            for raza in data:
                if pasa_filtros(raza):
                    resultados_dict[raza["name"]] = raza

        # 6️⃣ Respuesta final
        return Response(list(resultados_dict.values()))
    
    
    # /razas/filtrar?energy=alta&barking=1

    # barking = request.query_params.get("barking")
    # trainability = request.query_params.get("trainability")
    # playfulness = request.query_params.get("playfulness")
    # grooming = request.query_params.get("grooming")


# Combinación de razas de ambas apis
class RazaFullDatos(APIView):
    def get(self, request):
        nombre = request.query_params.get("name", "").lower()

        # Obtener todas las razas de DogAPI
        dog_all = dogapi_service.getRazas()

        # Filtrar coincidencias
        dogs = [raza for raza in dog_all if nombre in raza["name"].lower()]

        # Obtener info de Ninja por cada raza encontrada
        resultados = []
        for raza in dogs:
            info_ninja = ninja_service.getRaza(raza["name"])

            resultados.append({"dogapi": raza, "ninja": info_ninja})
        return Response({"resultados": resultados})
