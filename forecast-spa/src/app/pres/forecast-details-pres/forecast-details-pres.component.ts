import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { Forecast } from '../../store/forecast/forecast.model';
import { City } from '../../store/city/city.model';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-forecast-details-pres',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardTitle,
    MatCard,
    NgIf,
    MatIconButton,
    MatIcon
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

  @Input({ transform: booleanAttribute }) isAdmin: boolean = false;

  @Output() jumpToEdit = new EventEmitter<Forecast>();

  onEdit(): void {
    if (this._forecast) {
      this.jumpToEdit.emit(this._forecast);
    }
  }
}
