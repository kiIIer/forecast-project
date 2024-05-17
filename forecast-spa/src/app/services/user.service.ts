import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../store/notification/notification.model';
import { City } from '../store/city/city.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  loadNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.endpoint}/upcoming-forecasts`);
  }

  loadFavorites(): Observable<City[]> {
    return this.http.get<City[]>(`${this.endpoint}/favorites`);
  }

  postFavorite(city: City): Observable<City> {
    return this.http.post<City>(`${this.endpoint}/favorites`, city);
  }

  deleteFavorite(id: string): Observable<City> {
    return this.http.delete<City>(`${this.endpoint}/favorites/${id}`);
  }
}
