import { Component, Input, OnInit } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { RazaService } from '../../services/raza-service';
import { Dogapi, RazaResponse } from '../../models/RazaModel';
import { CardDog } from '../../components/card-dog/card-dog';
import { Spinner } from '../../components/spinner/spinner';
import { DetalleDog } from '../../components/detalle-dog/detalle-dog';

@Component({
  selector: 'app-razas',
  imports: [PaginatorModule, CardDog, Spinner, DetalleDog],
  templateUrl: './razas.html',
  styleUrl: './razas.css',
})
export class Razas implements OnInit {
  selectedRaza?: RazaResponse;
  dialogVisible = false;

  cargando: boolean = false;
  first: number = 0;
  rows: number = 20;
  arrAllRazas: Dogapi[] = [];

  constructor(private razaService: RazaService) {}

  ngOnInit(): void {
    this.getAllRazas();
  }

  public getAllRazas() {
    this.cargando = true;
    this.razaService.getRazas().subscribe((respuesta) => {
      this.arrAllRazas = respuesta;
      this.cargando = false;
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 20;
    // Scroll automático hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  razasPaginadas(): Dogapi[] {
    return this.arrAllRazas.slice(this.first, this.first + this.rows);
  }

  openDialogDetalleDog(dog: Dogapi) {
    this.selectedRaza = {
      dogapi: dog,
      ninja: [],
    };
    this.dialogVisible = true;
  }
}
