import { Component, EventEmitter, Input, Output } from '@angular/core';
import { City } from '../../store/city/city.model';
import { JsonPipe, NgForOf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cities-pres',
  standalone: true,
  imports: [
    JsonPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgForOf
  ],
  templateUrl: './cities-pres.component.html',
  styleUrls: ['./cities-pres.component.css']
})
export class CitiesPresComponent {
  @Input({ transform: (value: City[] | null): City[] => value ? value : [] }) cities: City[] = [];
  @Input() favourites: number[] = [];
  @Input() title = 'Cities';

  @Output() public cityChosen = new EventEmitter<City>();
  @Output() public toggleFavourite = new EventEmitter<City>();

  isFavourite(city: City): boolean {
    return this.favourites.includes(city.id);
  }

  onCityChosen(city: City) {
    this.cityChosen.emit(city);
  }

  onToggleFavourite(city: City) {
    this.toggleFavourite.emit(city);
  }
}
