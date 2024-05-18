import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../store/notification/notification.model';
import { City } from '../store/city/city.model';
import { Favourite } from '../store/favourite/favourite.model';

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

  loadFavourites(): Observable<Favourite[]> {
    return this.http.get<Favourite[]>(`${this.endpoint}/favourites`);
  }

  postFavorite(favourite: Favourite): Observable<Favourite> {
    return this.http.post<Favourite>(`${this.endpoint}/favourites`, favourite);
  }

  deleteFavorite(id: string): Observable<Favourite> {
    return this.http.delete<Favourite>(`${this.endpoint}/favourites/${id}`);
  }
}
