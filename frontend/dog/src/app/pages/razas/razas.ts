import { Component, Input, OnInit } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { RazaService } from '../../services/raza-service';
import { Dogapi, RazaResponse } from '../../models/RazaModel';
import { CardDog } from '../../components/card-dog/card-dog';
import { Chip } from 'primeng/chip';
import { Spinner } from '../../components/spinner/spinner';
import { DetalleDog } from '../../components/detalle-dog/detalle-dog';

@Component({
  selector: 'app-razas',
  imports: [PaginatorModule, CardDog, Spinner, Chip, DetalleDog],
  templateUrl: './razas.html',
  styleUrl: './razas.css',
})
export class Razas implements OnInit {
  selectedRaza!: string;
  dialogVisible = false;

  cargando: boolean = false;
  first: number = 0;
  rows: number = 20;
  arrAllRazas: Dogapi[] = [];
  chipsFilters: string[] = ['Friendly', 'Affectionate', 'Loyal', 'Intelligent', 'Trainable', 'Energetic', 'Calm', 'Gentle', 'Protective', 'Playful']

  constructor(private razaService: RazaService) {}

  ngOnInit(): void {
    this.getAllRazas();
  }

  public getAllRazas() {
    this.cargando = true;
    this.razaService.getRazas().subscribe((respuesta) => {
      this.arrAllRazas = respuesta;
      
      this.chipsFilters.forEach(chip => {
        return chip;
      });

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
    this.selectedRaza = dog.name!;
    this.dialogVisible = true;
  }
}
