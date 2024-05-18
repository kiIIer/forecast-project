import { Component, Input } from '@angular/core';
import { Forecast } from '../../store/forecast/forecast.model';
import { City } from '../../store/city/city.model';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forecast-details-pres',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardTitle,
    MatCard,
    NgIf
  ],
  templateUrl: './forecast-details-pres.component.html',
  styleUrl: './forecast-details-pres.component.css'
})
export class ForecastDetailsPresComponent {
  public _forecast: Forecast | null = null;

  @Input()
  set forecast(value: Forecast | undefined | null) {
    this._forecast = value ? value : null;
  }
  public _city: City | null = null;

  @Input()
  set city(value: City | undefined | null) {
    this._city = value ? value : null;
  }
  formatDate(date: string): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
