import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Dogapi, Ninja, RazaResponse } from '../../models/RazaModel';
import { Chip } from 'primeng/chip';
import { RazaService } from '../../services/raza-service';
import { Spinner } from "../spinner/spinner";

@Component({
  selector: 'app-detalle-dog',
  imports: [Dialog, ButtonModule, Chip, Spinner],
  templateUrl: './detalle-dog.html',
  styleUrl: './detalle-dog.css',
})
export class DetalleDog implements OnChanges {
  @Input() razaResponse?: RazaResponse;
  dogapi?: Dogapi;
  ninja?: Ninja;
  @Input() nombre!: string;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  temperament?: string[] = [];
  cargando: boolean = false;

  constructor(private razaService: RazaService) {}

  ngOnInit() {
    this.verDetalleDog();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nombre'] && this.nombre) {
      this.verDetalleDog();
    }
  }

  verDetalleDog() {
    this.cargando = true;
    this.razaService.getRazaDetalle(this.nombre).subscribe({
      next: (resp) => {
        this.razaResponse = resp;
        this.dogapi = resp.dogapi;
        this.ninja = resp.ninja?.[0];
        this.temperament = this.razaResponse?.dogapi?.temperament?.split(',');
        this.cargando = false;
      },
      error: (err) => console.error(err),
    });
  }

  closeDialog() {
    this.visibleChange.emit(false);
    this.razaResponse = undefined;
    this.dogapi = undefined;
    this.ninja = undefined;
  }
}
