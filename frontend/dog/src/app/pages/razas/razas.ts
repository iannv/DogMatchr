import { Component, Input, OnInit } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { RazaService } from '../../services/raza-service';
import { Dogapi, RazaResponse } from '../../models/RazaModel';
import { CardDog } from '../../components/card-dog/card-dog';
import { Chip } from 'primeng/chip';
import { Spinner } from '../../components/spinner/spinner';
import { DetalleDog } from '../../components/detalle-dog/detalle-dog';
import { FiltroAvanzado } from '../../components/filtro-avanzado/filtro-avanzado';
import { ActividadValue } from '../../types/EstadoProps';

@Component({
  selector: 'app-razas',
  imports: [PaginatorModule, CardDog, Spinner, Chip, DetalleDog, FiltroAvanzado],
  templateUrl: './razas.html',
  styleUrl: './razas.css',
})
export class Razas implements OnInit {
  selectedRaza!: string;
  dialogVisible = false;

  cargando: boolean = false;
  first: number = 0;
  rows: number = 20;

  arrAllRazas: RazaResponse[] = [];
  razasFiltradas: RazaResponse[] = [];

  chipsFilters: string[] = [
    'Friendly',
    'Affectionate',
    'Loyal',
    'Intelligent',
    'Trainable',
    'Energetic',
    'Calm',
    'Gentle',
    'Protective',
    'Playful',
  ];

  constructor(private razaService: RazaService) {}

  ngOnInit(): void {
    this.getAllRazas();
  }

  public getAllRazas() {
    this.cargando = true;

    this.razaService.getRazasDogapi().subscribe((razas) => {
      this.arrAllRazas = razas.map((dog) => ({
        dogapi: dog,
        ninja: undefined, // se carga después si hace falta
      }));
      this.chipsFilters.forEach((chip) => {
        return chip;
      });

      this.razasFiltradas = [...this.arrAllRazas];
      this.cargando = false;
    });
  }

  // this.razaService.getRazas().subscribe((respuesta) => {
  //   this.arrAllRazas = respuesta;
  //   // this.arrAllRazas = razas.map((dog) => ({
  //   //   dogapi: dog,
  //   //   ninja: [],
  //   // }));

  //   this.razasFiltradas = [...respuesta];

  //   this.cargando = false;
  // });

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 20;
    // Scroll automático hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  razasPaginadas(): RazaResponse[] {
    //:Dogapi[]
    // .arrAllRazas
    return this.razasFiltradas.slice(this.first, this.first + this.rows);
  }

  openDialogDetalleDog(dog: Dogapi) {
    this.selectedRaza = dog.name!;
    this.dialogVisible = true;
  }

  // /////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////
  // Filtros avanzados
  actividadSeleccionada: number | null = null;

  filtrarXActividad(actividad: number | null) {
    if (!actividad) {
      this.razasFiltradas = [...this.arrAllRazas];
      this.first = 0;
      return;
    }

    this.razaService.getRazasFiltradas(actividad).subscribe((ninjaDogs) => {
      const nombresNinja = ninjaDogs.map((n) => n.name?.toLowerCase());

      this.razasFiltradas = this.arrAllRazas.filter((raza) =>
        nombresNinja.includes(raza.dogapi?.name?.toLowerCase())
      );

      this.first = 0;
    });
  }
}
