from django.contrib import admin
from django.urls import path, include
from .views import (
    RazasView,
    RazaView,
    RazaGrupoView,
    # RazaBuscarView,
    RazaFullDatos,
    FiltrosAvanzadosView,
)

urlpatterns = [
    path("razas/buscar/", RazaFullDatos.as_view(), name="buscar raza"),
    path("razas/", RazasView.as_view(), name="razas"),
    
    path("razas/filtrar/", FiltrosAvanzadosView.as_view(), name="filtrar"),
    
    path("razas/<str:nombre>", RazaView.as_view(), name="raza"),
    path("razas/buscar-grupo/", RazaGrupoView.as_view(), name="buscar-grupo"),
]

# http://127.0.0.1:8000/razas/filtrar/?energy=5&barking=1&trainability=4