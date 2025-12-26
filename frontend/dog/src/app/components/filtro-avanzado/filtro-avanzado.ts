import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface FiltroOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-filtro-avanzado',
  imports: [FormsModule, Select],
  templateUrl: './filtro-avanzado.html',
  styleUrl: './filtro-avanzado.css',
})
export class FiltroAvanzado implements OnInit {
  viviendas: FiltroOption[] | undefined;
  selectedVivienda: FiltroOption | undefined;

  tiempoLibre: FiltroOption[] | undefined;
  selectedTiempoLibre: FiltroOption | undefined;

  actividad: FiltroOption[] | undefined;
  selectedActividad: FiltroOption | undefined;

  adiestramiento: FiltroOption[] | undefined;
  selectedAdiestramiento: FiltroOption | undefined;

  ngOnInit() {
    this.viviendas = [
      { label: 'Departamento chico', value: 'dpto_chico' },
      { label: 'Departamento amplio', value: 'dpto_amplio' },
      { label: 'Casa sin patio', value: 'casa_sin_patio' },
      { label: 'Casa con patio', value: 'casa_patio' },
      { label: 'Quinta/Campo', value: 'quinta_campo' },
    ];

    this.tiempoLibre = [
      { label: 'Menos de 1 hora', value: '0-1' },
      { label: '1 a 2 horas', value: '1-2' },
      { label: '2 a 3 horas', value: '2-3' },
      { label: '4 horas o más', value: '4_mas' },
    ];

    this.actividad = [
      { label: 'Baja', value: 'baja' },
      { label: 'Moderada', value: 'moderada' },
      { label: 'Alta', value: 'alta' },
    ];

    this.adiestramiento = [
      { label: 'No es importante', value: 'no_importante' },
      { label: 'Importante', value: 'importante' },
      { label: 'Muy importante', value: 'muy_importante' },
    ];
  }
}
