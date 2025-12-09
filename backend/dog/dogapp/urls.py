from django.contrib import admin
from django.urls import path, include
from .views import (
    RazasView,
    RazaView,
    RazaGrupoView,
    # RazaBuscarView,
    RazaFullDatos,
)

urlpatterns = [
    path("razas/buscar/", RazaFullDatos.as_view(), name="buscar raza"),

    path("razas/", RazasView.as_view(), name="razas"),
    path("razas/<str:nombre>", RazaView.as_view(), name="raza"),
    path("razas/buscar-grupo/", RazaGrupoView.as_view(), name="buscar-grupo"),
    # path("razas/<int:id>/", RazaView.as_view(), name="raza"),
]
