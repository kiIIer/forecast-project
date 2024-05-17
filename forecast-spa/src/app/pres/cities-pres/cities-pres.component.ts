import { Component, Input } from '@angular/core';
import { City } from '../../store/city/city.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cities-pres',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './cities-pres.component.html',
  styleUrl: './cities-pres.component.css'
})
export class CitiesPresComponent {
  @Input() cities: City[] = [];
}
