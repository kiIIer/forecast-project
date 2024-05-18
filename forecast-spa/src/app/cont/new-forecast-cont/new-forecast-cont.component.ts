import { Component } from '@angular/core';
import { ForecastEditorPresComponent } from '../../pres/forecast-editor-pres/forecast-editor-pres.component';
import { Forecast } from '../../store/forecast/forecast.model';
import { Store } from '@ngrx/store';
import { ForecastActions } from '../../store/forecast/forecast.actions';

@Component({
  selector: 'app-new-forecast-cont',
  standalone: true,
  imports: [
    ForecastEditorPresComponent
  ],
  templateUrl: './new-forecast-cont.component.html',
  styleUrl: './new-forecast-cont.component.css'
})
export class NewForecastContComponent {

  constructor(private store: Store) {
  }

  onSubmitted(forecast: Forecast): void {
    this.store.dispatch(ForecastActions.startAddForecast({ forecast }));
  }
}
