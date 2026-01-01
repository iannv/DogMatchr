import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dogapi, Ninja, RazaResponse } from '../models/RazaModel';

@Injectable({
  providedIn: 'root',
})
export class RazaService {
  constructor(private http: HttpClient) {}

  urlApi: string = 'http://127.0.0.1:8000/razas/';
  urlNinja: string = 'http://127.0.0.1:8000/razas/filtrar/';

  public getRazasDogapi(): Observable<Dogapi[]> {
    return this.http.get<Dogapi[]>(this.urlApi);
  }

  public getRazas(): Observable<RazaResponse[]> {
    return this.http.get<RazaResponse[]>(this.urlApi);
  }

  public getRazaByName(nombre: string): Observable<Dogapi[]> {
    return this.http.get<Dogapi[]>(`${this.urlApi}${nombre}`);
  }

  public getRazaDetalle(nombre: string): Observable<RazaResponse> {
    return this.http.get<RazaResponse>(`${this.urlApi}${nombre}`);
  }

  public getEnergyNinja(energy: number): Observable<Ninja[]> {
    return this.http.get<Ninja[]>(`${this.urlNinja}energy=${energy}`);
  }
}
