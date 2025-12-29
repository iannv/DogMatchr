import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Dogapi, Ninja, RazaResponse } from '../../models/RazaModel';
import { Chip } from 'primeng/chip';
import { RazaService } from '../../services/raza-service';
import { Spinner } from '../spinner/spinner';
import { GalleriaModule } from 'primeng/galleria';
import { EstadoProps } from '../../types/EstadoProps';
import { RequiredValidator } from '@angular/forms';

@Component({
  selector: 'app-detalle-dog',
  imports: [Dialog, ButtonModule, Chip, Spinner, GalleriaModule],
  templateUrl: './detalle-dog.html',
  styleUrl: './detalle-dog.css',
})
export class DetalleDog implements OnChanges, OnDestroy {
  @Input() razaResponse?: RazaResponse;
  @Input() nombre!: string;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  dogapi?: Dogapi;
  ninja?: Ninja;

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

  ngOnDestroy(): void {}

  images: { itemImageSrc: string }[] = [];
  verDetalleDog() {
    this.cargando = true;
    this.razaService.getRazaDetalle(this.nombre).subscribe({
      next: (resp) => {
        this.razaResponse = resp;
        this.dogapi = resp.dogapi;
        this.ninja = resp.ninja?.[0];
        this.temperament = this.razaResponse?.dogapi?.temperament?.split(',');
        this.cargando = false;

        this.energia();
        this.coatLength();
        this.protector();
        this.adiestramiento();
        this.jugueton();
        this.ladrido();
        this.aseo();

        this.buenoConNinos();
        this.buenoConPersonas();
        this.buenoConMascotas();

        this.estados.ninos = this.getEstado(this.ninja?.good_with_children!);
        this.estados.extranos = this.getEstado(this.ninja?.good_with_strangers!);
        this.estados.mascotas = this.getEstado(this.ninja?.good_with_other_dogs!);

        this.images = [];
        if (this.dogapi?.image?.url) {
          this.images.push({
            itemImageSrc: this.dogapi.image.url,
          });
        }
        if (this.ninja?.image_link) {
          this.images.push({
            itemImageSrc: this.ninja.image_link,
          });
        }
        console.log('CANTIDAD DE IMAGENES: ' + this.images.length);
      },
      error: (err) => console.error(err),
    });
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  // Propiedades
  energy: string = '';
  coat_length: string = '';
  protectiveness: string = '';
  trainability: string = '';
  playfulness: string = '';
  barking: string = '';
  grooming: string = '';

  good_with_children_prop: string = '';
  good_with_strangers: string = '';
  good_with_other_dogs: string = '';

  coatLength() {
    if (this.ninja?.coat_length! > 1) this.coat_length = 'Corto';
    else if (this.ninja?.coat_length! > 2) this.coat_length = 'Mediano';
    else if (this.ninja?.coat_length === 1) this.coat_length = 'Largo';
    else this.coat_length = 'No disponible';
    return this.ninja?.coat_length;
  }

  energia() {
    if (this.ninja?.energy! < 3) this.energy = 'Tranquilo';
    else if (this.ninja?.energy === 3) this.energy = 'Activo';
    else if (this.ninja?.energy! > 3) this.energy = 'Muy activo';
    else this.energy = 'No disponible';
    return this.energy;
  }

  protector() {
    if (this.ninja?.protectiveness! < 3) this.protectiveness = 'Relajado';
    else if (this.ninja?.protectiveness === 3) this.protectiveness = 'Atento';
    else if (this.ninja?.protectiveness! > 3) this.protectiveness = 'Guardián';
    else this.protectiveness = 'No disponible';
    return this.protectiveness;
  }

  adiestramiento() {
    if (this.ninja?.trainability! < 3) this.trainability = 'Difícil';
    else if (this.ninja?.trainability === 3) this.trainability = 'Entrenable';
    else if (this.ninja?.trainability! > 3) this.trainability = 'Muy obediente';
    else this.trainability = 'No disponible';
    return this.trainability;
  }

  jugueton() {
    if (this.ninja?.playfulness! < 3) this.playfulness = 'Tranquilo';
    else if (this.ninja?.playfulness === 3) this.playfulness = 'Moderado';
    else if (this.ninja?.playfulness! > 3) this.playfulness = 'Muy juguetón';
    else this.playfulness = 'No disponible';
    return this.playfulness;
  }

  ladrido() {
    if (this.ninja?.barking! < 3) this.barking = 'Silencioso';
    else if (this.ninja?.barking === 3) this.barking = 'Moderado';
    else if (this.ninja?.barking! > 3) this.barking = 'Alto';
    else this.barking = 'No disponible';
    return this.barking;
  }

  aseo() {
    if (this.ninja?.grooming! < 3) this.grooming = 'Poco';
    else if (this.ninja?.grooming === 3) this.grooming = 'Regular';
    else if (this.ninja?.grooming! > 3) this.grooming = 'Frecuente';
    else this.grooming = 'No disponible';
    return this.grooming;
  }

  buenoConNinos() {
    if (this.ninja?.good_with_children! < 3)
      this.good_with_children_prop = 'No ideal para familias con niños pequeños';
    else if (this.ninja?.good_with_children! === 3)
      this.good_with_children_prop = 'Se lleva bien con niños';
    else if (this.ninja?.good_with_children! > 3)
      this.good_with_children_prop = 'Excelente compañero para familia con niños';
    else this.good_with_children_prop = 'No disponible';
    return this.good_with_children_prop;
  }

  buenoConPersonas() {
    if (this.ninja?.good_with_strangers! < 3)
      this.good_with_strangers = 'Puede mostrarse resevado con extraños';
    else if (this.ninja?.good_with_strangers! === 3)
      this.good_with_strangers = 'Se lleva bien con personas nuevas';
    else if (this.ninja?.good_with_strangers! > 3)
      this.good_with_strangers = 'Sociable con personas nuevas';
    else this.good_with_strangers = 'No disponible';
    return this.good_with_strangers;
  }

  buenoConMascotas() {
    if (this.ninja?.good_with_other_dogs! < 3)
      this.good_with_other_dogs = 'No siempre se lleva bien con otras mascotas';
    else if (this.ninja?.good_with_other_dogs! === 3)
      this.good_with_other_dogs = 'Convive bien con otras mascotas';
    else if (this.ninja?.good_with_other_dogs! > 3)
      this.good_with_other_dogs = 'Se lleva bien con otras mascotas';
    else this.good_with_other_dogs = 'No disponible';
    return this.good_with_other_dogs;
  }

  // Estados - Manejo de colores
  estados: {
    ninos?: EstadoProps;
    extranos?: EstadoProps;
    mascotas?: EstadoProps;
  } = {};

  private getEstado(valor: number): EstadoProps {
    if (valor > 0 && valor < 3) return 'bad';
    if (valor === 3) return 'warning';
    if (valor > 3) return 'good';
    return 'neutro';
  }

  getTitleClass(valor?: number) {
    const estado = this.getEstado(valor!);
    return estado ? `title-${estado}` : '';
  }

  getSubtitleClass(valor?: number) {
    const estado = this.getEstado(valor!);
    return estado ? `subtitle-${estado}` : '';
  }

  getIconClass(valor?: number) {
    return this.getEstado(valor ?? 0);
  }

  getBorderClass(valor?: number) {
    const estado = this.getEstado(valor!);
    return estado ? `border-${estado}` : '';
  }

  getBackgroundClass(valor?: number) {
    const estado = this.getEstado(valor!);
    return estado ? `background-${estado}` : '';
  }
}
