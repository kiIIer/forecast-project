import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../store/city/city.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  endpoint = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  loadCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.endpoint}/cities`);
  }

  postCity(city: City): Observable<City> {
    return this.http.post<City>(`${this.endpoint}/cities`, city);
  }

  deleteCity(id: string): Observable<City> {
    return this.http.delete<City>(`${this.endpoint}/cities/${id}`);
  }
}