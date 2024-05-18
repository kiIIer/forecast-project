import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Forecast } from '../store/forecast/forecast.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  endpoint = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  loadForecasts(): Observable<Forecast[]> {
    return this.http.get<Forecast[]>(`${this.endpoint}/forecasts`);
  }

  postForecast(forecast: Forecast): Observable<Forecast> {
    return this.http.post<Forecast>(`${this.endpoint}/forecasts`, forecast);
  }

  deleteForecast(id: string): Observable<Forecast> {
    return this.http.delete<Forecast>(`${this.endpoint}/forecasts/${id}`);
  }
}
