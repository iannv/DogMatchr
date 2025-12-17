import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Dogapi, Ninja, RazaResponse } from '../../models/RazaModel';
import { Chip } from 'primeng/chip';
import { RazaService } from '../../services/raza-service';

@Component({
  selector: 'app-detalle-dog',
  imports: [Dialog, ButtonModule, Chip],
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

  // Corregir los chips que se traban en el primer modal y no vuelven a recargarse
  temperament?: string[] = [];

  constructor(private razaService: RazaService) {}

  ngOnInit() {
    this.verDetalleDog();
    this.temperament = this.razaResponse?.dogapi?.temperament?.split(',');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nombre'] && this.nombre) {
      this.verDetalleDog();
    }
  }

  verDetalleDog() {
    this.razaService.getRazaDetalle(this.nombre).subscribe({
      next: (resp) => {
        this.razaResponse = resp;
        this.dogapi = resp.dogapi;
        this.ninja = resp.ninja?.[0];
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
