import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CardDog } from '../../components/card-dog/card-dog';
import { RazaService } from '../../services/raza-service';
import { Dogapi, RazaResponse } from '../../models/RazaModel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [FormsModule, InputTextModule, ButtonModule, IconField, InputIcon, CardDog, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit, OnChanges {
  constructor(private razaService: RazaService) {}

  arrRazasLimit: Dogapi[] = [];
  arrAllRazas: Dogapi[] = [];

  ngOnInit() {
    this.getRazasLimit(20);
    // this.getAllRazas();
  }

  ngOnChanges(): void {
    this.getRazasLimit(20);
  }

  public getRazasLimit(limit: number) {
    this.razaService.getRazas().subscribe((respuesta) => {
      this.arrRazasLimit = respuesta.slice(0, limit);
    });
  }

  // public getAllRazas() {
  //   this.razaService.getRazas().subscribe((respuesta) => {
  //     this.arrAllRazas = respuesta;
  //   });
  // }
}
