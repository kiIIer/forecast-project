import { Component } from '@angular/core';
import { ForecastDetailsPresComponent } from '../../pres/forecast-details-pres/forecast-details-pres.component';
import { combineLatestWith, map, Observable, of, switchMap } from 'rxjs';
import { Forecast } from '../../store/forecast/forecast.model';
import { City } from '../../store/city/city.model';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '../../store/router/router.reducer';
import { selectEntities as selectForecastEntities } from '../../store/forecast/forecast.reducer';
import { selectEntities as selectCityEntities } from '../../store/city/city.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-forecast-details-cont',
  standalone: true,
  imports: [
    ForecastDetailsPresComponent,
    AsyncPipe
  ],
  templateUrl: './forecast-details-cont.component.html',
  styleUrl: './forecast-details-cont.component.css'
})
export class ForecastDetailsContComponent {
  forecast$: Observable<Forecast | undefined> = this.store.select(selectForecastEntities).pipe(
    combineLatestWith(this.store.select(selectRouteParams)),
    map(([forecastEntities, params]) => forecastEntities[params['forecast_id']])
  );
  city$: Observable<City | undefined> = this.forecast$.pipe(
    switchMap(forecast => {
      if (forecast) {
        return this.store.select(selectCityEntities).pipe(
          map(cityEntities => cityEntities[forecast.cityId])
        );
      } else {
        return of(undefined);
      }
    })
  );

  constructor(private store: Store) {
  }

}
