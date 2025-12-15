import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CardDog } from '../../components/card-dog/card-dog';
import { RazaService } from '../../services/raza-service';
import { Dogapi } from '../../models/RazaModel';
import { RouterLink } from '@angular/router';
import { Spinner } from "../../components/spinner/spinner";

@Component({
  selector: 'app-inicio',
  imports: [FormsModule, InputTextModule, ButtonModule, IconField, InputIcon, CardDog, RouterLink, Spinner],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit, OnChanges {
  constructor(private razaService: RazaService) {}

  cargando: boolean = false;
  arrRazasLimit: Dogapi[] = [];

  ngOnInit() {
    this.getRazasLimit(20);
  }

  ngOnChanges(): void {
    this.getRazasLimit(20);
  }

  public getRazasLimit(limit: number) {
    this.cargando = true;
    this.razaService.getRazas().subscribe((respuesta) => {
      this.arrRazasLimit = respuesta.slice(0, limit);
      this.cargando = false;
    });
  }

}
