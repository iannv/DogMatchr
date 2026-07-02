from django.contrib import admin
from django.urls import path, include
from .views import (
    RazasView,
    RazaView,
    RazaGrupoView,
    # RazaBuscarView,
    RazaFullDatos,
    # RazasImageView
)

urlpatterns = [
    path("razas/buscar/", RazaFullDatos.as_view(), name="buscar raza"),
# https://api.thedogapi.com/v1/images/BJa4kxc4X
# https://api.thedogapi.com/v1/images/search?breed_ids=1
    path("razas/", RazasView.as_view(), name="razas"),
    # path("razas/<int:id>/image/", RazasImageView.as_view(), name="raza-image"),
    path("razas/<str:nombre>", RazaView.as_view(), name="raza"),
    path("razas/buscar-grupo/", RazaGrupoView.as_view(), name="buscar-grupo"),
    # path("razas/<int:id>/", RazaView.as_view(), name="raza"),
]
