import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CardDog } from '../../components/card-dog/card-dog';
import { RazaService } from '../../services/raza-service';
import { Dogapi } from '../../models/RazaModel';

@Component({
  selector: 'app-inicio',
  imports: [FormsModule, InputTextModule, ButtonModule, IconField, InputIcon, CardDog],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  constructor(private razaService: RazaService) {}

  arrRazasLimit: Dogapi[] = [];
  arrAllRazas: Dogapi[] = [];

  ngOnInit() {
    this.getRazasLimit(20);
    // this.getAllRazas();
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
