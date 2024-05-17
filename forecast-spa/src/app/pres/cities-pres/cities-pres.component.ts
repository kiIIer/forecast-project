import { Component, Input } from '@angular/core';
import { City } from '../../store/city/city.model';
import { JsonPipe, NgForOf } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-cities-pres',
  standalone: true,
  imports: [
    JsonPipe,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    NgForOf
  ],
  templateUrl: './cities-pres.component.html',
  styleUrl: './cities-pres.component.css'
})
export class CitiesPresComponent {
  @Input({ transform: (value: City[] | null): City[] => value ? value : [] }) cities: City[] = [];
  @Input() title = 'Cities';

  onClick(city: City) {
    console.log(city);
  }
}
