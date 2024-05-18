import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Forecast } from '../../store/forecast/forecast.model';

@Component({
  selector: 'app-forecasts-pres',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './forecasts-pres.component.html',
  styleUrls: ['./forecasts-pres.component.css']
})
export class ForecastsPresComponent {
  @Input({ transform: (value: Forecast[] | null): Forecast[] => value ? value : [] }) forecasts: Forecast[] = [];
  @Input() title = 'Forecasts';
  @Output() public forecastChosen = new EventEmitter<Forecast>();

  get sortedForecasts(): Forecast[] {
    return this.forecasts.sort((a, b) => new Date(a.dateOfForecast).getTime() - new Date(b.dateOfForecast).getTime());
  }

  onForecastChosen(forecast: Forecast) {
    this.forecastChosen.emit(forecast);
  }
}
