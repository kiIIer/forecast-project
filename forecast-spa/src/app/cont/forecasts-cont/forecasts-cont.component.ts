import { Component } from '@angular/core';
import { ForecastsPresComponent } from '../../pres/forecasts-pres/forecasts-pres.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Forecast } from '../../store/forecast/forecast.model';
import { selectAll } from '../../store/forecast/forecast.reducer';
import { AsyncPipe } from '@angular/common';
import { RouterActions } from '../../store/router/router.actions';

@Component({
  selector: 'app-forecasts-cont',
  standalone: true,
  imports: [
    ForecastsPresComponent,
    AsyncPipe
  ],
  templateUrl: './forecasts-cont.component.html',
  styleUrl: './forecasts-cont.component.css'
})
export class ForecastsContComponent {
  forecasts$: Observable<Forecast[]> = this.store.select(selectAll);

  constructor(private store: Store) {
  }

  onForecastChosen(forecast: Forecast) {
    this.store.dispatch(RouterActions.navigateByUrl({ url: `/forecasts/${forecast.id}` }));
  }
}
