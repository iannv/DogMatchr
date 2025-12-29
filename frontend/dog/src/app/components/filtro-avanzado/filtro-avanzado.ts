import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { RazaService } from '../../services/raza-service';
import { ActividadValue } from '../../types/EstadoProps';

interface FiltroOption<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-filtro-avanzado',
  imports: [FormsModule, Select, CommonModule, CheckboxModule],
  templateUrl: './filtro-avanzado.html',
  styleUrl: './filtro-avanzado.css',
})
export class FiltroAvanzado implements OnInit {
  constructor(private razaService: RazaService) {}

  viviendas: FiltroOption[] | undefined;
  selectedVivienda: FiltroOption | undefined;

  tiempoLibre: FiltroOption[] | undefined;
  selectedTiempoLibre: FiltroOption | undefined;

  actividad: FiltroOption<ActividadValue>[] | undefined;
  selectedActividad?: FiltroOption<ActividadValue>;

  adiestramiento: FiltroOption[] | undefined;
  selectedAdiestramiento: FiltroOption | undefined;

  ruido: FiltroOption[] | undefined;
  selectedRuido: FiltroOption | undefined;

  aseo: FiltroOption[] | undefined;
  selectedAseo: FiltroOption | undefined;

  convive: FiltroOption[] | undefined;
  selectedConvive: FiltroOption | undefined;

  personalidad: FiltroOption[] = [];
  selectedPersonalidad: FiltroOption[] = [];

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
      { label: 'Baja', value: 1 },
      { label: 'Moderada', value: 2 },
      { label: 'Alta', value: 2 },
    ];

    this.adiestramiento = [
      { label: 'No es importante', value: 'no_importante' },
      { label: 'Importante', value: 'importante' },
      { label: 'Muy importante', value: 'muy_importante' },
    ];

    this.ruido = [
      { label: 'Baja', value: 'baja' },
      { label: 'Moderada', value: 'moderada' },
      { label: 'Alta', value: 'alta' },
    ];

    this.aseo = [
      { label: 'Poco', value: 'poco' },
      { label: 'Moderado', value: 'moderado' },
      { label: 'Mucho', value: 'mucho' },
    ];

    this.convive = [
      { label: 'Niños', value: 'niños' },
      { label: 'Otras mascotas', value: 'mascotas' },
      { label: 'Desconocidos', value: 'desconocidos' },
    ];

    this.personalidad = [
      { label: 'Protector', value: 'protector' },
      { label: 'Tranquilo', value: 'tranquilo' },
      { label: 'Cariñoso y familiar', value: 'cariñoso_familiar' },
      { label: 'Jugueton y divertido', value: 'jugueton_divertido' },
      { label: 'Inteligente', value: 'inteligente' },
      { label: 'Independiente', value: 'independiente' },
    ];

    this.filtrarActividad();
  }

  // Filtros avanzados
  filtrarVivienda() {}

  filtrarTiempoLibre() {}

  @Output() actividadEmitter = new EventEmitter<ActividadValue | null>();
  filtrarActividad() {
    this.actividadEmitter.emit(this.selectedActividad?.value ?? null);
  }

  filtrarAdiestramiento() {}

  filtrarRuido() {}

  filtrarAseo() {}

  filtrarConvive() {}

  filtrarPersonalidad() {}
}
