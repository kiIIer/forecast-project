import { Component } from '@angular/core';
import { combineLatestWith, map, Observable } from 'rxjs';
import { Forecast } from '../../store/forecast/forecast.model';
import { selectAll } from '../../store/forecast/forecast.reducer';
import { Store } from '@ngrx/store';
import { RouterActions } from '../../store/router/router.actions';
import { AsyncPipe } from '@angular/common';
import { ForecastsPresComponent } from '../../pres/forecasts-pres/forecasts-pres.component';
import { selectRouteParams } from '../../store/router/router.reducer';
import { selectEntities } from '../../store/city/city.reducer';
import { City } from '../../store/city/city.model';

@Component({
  selector: 'app-city-details',
  standalone: true,
  imports: [
    AsyncPipe,
    ForecastsPresComponent
  ],
  templateUrl: './city-details.component.html',
  styleUrl: './city-details.component.css'
})
export class CityDetailsComponent {
  forecasts$: Observable<Forecast[]> = this.store.select(selectAll).pipe(
    combineLatestWith(this.store.select(selectRouteParams)),
    map(([forecasts, params]) =>
      forecasts.filter(forecast => forecast.cityId === +params['city_id'])
    )
  );

  city_title$: Observable<string> = this.store.select(selectEntities).pipe(
    combineLatestWith(this.store.select(selectRouteParams)),
    map(([cityEntities, params]) => cityEntities[params['city_id']]),
    map((maybeCity) => maybeCity ? maybeCity : { id: -1, name: 'Unknown' }),
    map((city) => 'Forecasts for ' + city.name)
  );

  constructor(private store: Store) {
  }


  onForecastChosen(forecast: Forecast) {
    this.store.dispatch(RouterActions.navigateByUrl({ url: `/forecasts/${forecast.id}` }));
  }
}