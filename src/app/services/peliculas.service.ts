import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private api = 'http://localhost:3000/peliculas';

  constructor(private http: HttpClient) {}

  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.api);
  }

  addPelicula(pelicula: Pelicula): Observable<any> {
    return this.http.post(this.api, pelicula);
  }

  deletePelicula(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}