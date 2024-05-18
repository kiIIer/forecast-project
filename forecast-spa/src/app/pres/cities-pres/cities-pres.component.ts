import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { City } from '../../store/city/city.model';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Favourite } from '../../store/favourite/favourite.model';

@Component({
  selector: 'app-cities-pres',
  standalone: true,
  imports: [
    JsonPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './cities-pres.component.html',
  styleUrls: ['./cities-pres.component.css']
})
export class CitiesPresComponent {
  @Input({ transform: (value: City[] | null): City[] => value ? value : [] }) cities: City[] = [];
  private _favourites: number[] = [];

  @Input()
  set favourites(value: Favourite[] | null) {
    this._favourites = value ? value.map(favourite => favourite.id) : [];
  }
  @Input() title = 'Cities';
  @Input({ transform: booleanAttribute }) isLoggedIn = false;

  @Output() public cityChosen = new EventEmitter<City>();
  @Output() public addFavourite = new EventEmitter<City>();
  @Output() public removeFavourite = new EventEmitter<City>();

  isFavourite(city: City): boolean {
    if (!this.isLoggedIn) {
      return false;
    }
    return this._favourites.includes(city.id);
  }

  onCityChosen(city: City) {
    this.cityChosen.emit(city);
  }

  onToggleFavourite(city: City) {
    if (this.isFavourite(city)) {
      this.removeFavourite.emit(city);
    } else {
      this.addFavourite.emit(city);
    }
  }
}