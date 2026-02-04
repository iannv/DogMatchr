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

        # ======================
        # FILTROS DEL FRONT
        # ======================
        FILTER_MAPS = {
            "energy": {
                "api": "energy",
                "values": {
                    "baja": [1, 2],
                    "moderada": [3],
                    "alta": [4, 5],
                },
            },
            "ruido": {
                "api": "barking",
                "values": {
                    "baja": [1, 2],
                    "moderada": [3],
                    "alta": [4, 5],
                },
            },
            "adiestramiento": {
                "api": "trainability",
                "values": {
                    "no_importante": [1, 2],
                    "importante": [3],
                    "muy_importante": [4, 5],
                },
            },
            "tiempoLibre": {
                "api": "playfulness",
                "values": {
                    "baja": [1, 2],
                    "moderada": [3],
                    "alta": [4, 5],
                },
            },
            "aseo": {
                "api": "grooming",
                "values": {
                    "poco": [1, 2],
                    "moderado": [3],
                    "mucho": [4, 5],
                },
            },
        }

        filtros_base = {}

        for filtro_front, config in FILTER_MAPS.items():
            valor = request.query_params.get(filtro_front)
            if valor and valor in config["values"]:
                filtros_base[config["api"]] = config["values"][valor]

        # ======================
        # MAPA DE VIVIENDA
        # ======================
        VIVIENDA_MAPS = {
            "dpto": {
                "energy": [1, 2, 3],
                "barking": [1, 2],
                "playfulness": [1, 2, 3],
            },
            "casa_sin_patio": {
                "energy": [2, 3],
                "barking": [1, 2, 3],
                "playfulness": [2, 3, 4],
            },
            "casa_patio": {
                "energy": [3, 4, 5],
                "barking": [2, 3, 4, 5],
                "playfulness": [3, 4, 5],
            },
            "quinta_campo": {
                "energy": [4, 5],
                "barking": [3, 4, 5],
                "playfulness": [4, 5],
            },
        }

        vivienda = request.query_params.get("vivienda")

        # ======================
        # CASO SIN VIVIENDA
        # ======================
        if not vivienda:
            razas_ninja = ninja_service.getFiltrosAvanzados(filtros_base)
            if isinstance(razas_ninja, dict):
                razas_ninja = [razas_ninja]

        # ======================
        # CASO CON VIVIENDA
        # ======================
        else:
            rangos = VIVIENDA_MAPS.get(vivienda)
            if not rangos:
                return Response([])

            combinaciones = product(
                rangos["energy"],
                rangos["barking"],
                rangos["playfulness"],
            )

            razas_ninja_total = []

            for energy, barking, playfulness in combinaciones:
                filtros = {
                    "energy": energy,
                    "barking": barking,
                    "playfulness": playfulness,
                }

                # aplicar filtros extra del front
                filtros.update({
                    k: v[0] for k, v in filtros_base.items()
                    if k not in filtros
                })

                resp = ninja_service.getFiltrosAvanzados(filtros)
                if isinstance(resp, list):
                    razas_ninja_total.extend(resp)

            # eliminar duplicados
            razas_ninja = {
                r["name"].lower(): r
                for r in razas_ninja_total
                if "name" in r
            }.values()

        # ======================
        # MATCH CON DOGAPI
        # ======================
        razas_dogapi = dogapi_service.getRazas()
        resultados = []

        for ninja in razas_ninja:
            nombre = ninja["name"].lower()
            dog = next(
                (d for d in razas_dogapi if d["name"].lower() == nombre),
                None,
            )
            if dog:
                resultados.append({
                    "dogapi": dog,
                    "ninja": ninja
                })

        return Response(resultados)

    # http://127.0.0.1:8000/razas/filtrar/?energy=baja
    # http://127.0.0.1:8000/razas/filtrar/?barking=baja
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
