import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ForecastActions } from './forecast.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { PopUpService } from '../../services/pop-up.service';
import { ForecastService } from '../../services/forecast.service';


@Injectable()
export class ForecastEffects {

  loadForecasts$ = createEffect(() => this.actions$.pipe(
    ofType(ForecastActions.startLoadForecasts),
    switchMap(() => this.forecastService.loadForecasts().pipe(
      map(forecasts => ForecastActions.loadForecasts({ forecasts })),
      catchError(() => {
        this.popUpService.openDialog('Error', 'Failed to load forecasts', 'error');
        return of(ForecastActions.loadForecasts({ forecasts: [] }));
      })
    ))
  ));

  postForecast$ = createEffect(() => this.actions$.pipe(
    ofType(ForecastActions.startAddForecast),
    switchMap(({ forecast }) => this.forecastService.postForecast(forecast).pipe(
      map(() => ForecastActions.addForecast({ forecast })),
      catchError(() => {
        this.popUpService.openDialog('Error', 'Failed to add forecast', 'error');
        return of(ForecastActions.addForecast({ forecast }));
      })
    ))
  ));

  deleteForecast$ = createEffect(() => this.actions$.pipe(
    ofType(ForecastActions.startDeleteForecast),
    switchMap(({ id }) => this.forecastService.deleteForecast(id).pipe(
      map(() => ForecastActions.deleteForecast({ id })),
      catchError(() => {
        this.popUpService.openDialog('Error', 'Failed to delete forecast', 'error');
        return of(ForecastActions.deleteForecast({ id }));
      })
    ))
  ));

  constructor(private actions$: Actions, private popUpService: PopUpService, private forecastService: ForecastService) {
  }
}
