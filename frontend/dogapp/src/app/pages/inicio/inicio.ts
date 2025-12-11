import { ChangeDetectorRef, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CardDog } from '../../components/card-dog/card-dog';
import { RazaService } from '../../services/raza-service';
import { Dogapi, RazaResponse } from '../../models/RazaModel';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-inicio',
  imports: [FormsModule, InputTextModule, ButtonModule, IconField, InputIcon, CardDog],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  constructor(
    private razaService: RazaService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  arrRazasLimit: Dogapi[] = [];
  arrAllRazas: Dogapi[] = [];

  ngOnInit() {
    this.getRazasLimit(20);
    // this.getAllRazas();

    // Detecta cuando el usuario vuelve a esta pantalla
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/inicio') {
          this.getRazasLimit(20);
        }
      });
  }

  public getRazasLimit(limit: number) {
    this.razaService.getRazas().subscribe((respuesta) => {
      this.arrRazasLimit = respuesta.slice(0, limit);
      this.cd.detectChanges();
    });
  }

  // public getAllRazas() {
  //   this.razaService.getRazas().subscribe((respuesta) => {
  //     this.arrAllRazas = respuesta;
  //   });
  // }
}
