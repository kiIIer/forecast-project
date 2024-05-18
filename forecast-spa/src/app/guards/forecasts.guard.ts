import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { catchError, filter, map, Observable, of, tap } from 'rxjs';
import { Forecast } from '../store/forecast/forecast.model';
import { ForecastActions } from '../store/forecast/forecast.actions';
import { selectAll } from '../store/forecast/forecast.reducer';
import { Store } from '@ngrx/store';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const forecastsGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return of(false);
  }

  const checkStore = (): Observable<boolean> => {
    return store.select(selectAll).pipe(
      tap((forecasts: Forecast[]) => {
        if (forecasts.length === 0) {
          store.dispatch(ForecastActions.startLoadForecasts());
        }
      }),
      filter((forecasts: Forecast[]) => forecasts.length !== 0),
      map(() => true)
    );
  };

  return checkStore().pipe(
    catchError(() => of(false))
  );
};