import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, filter, map, Observable, of, scheduled, switchMap, tap } from 'rxjs';
import { City } from '../store/city/city.model';
import { CityActions } from '../store/city/city.actions';
import { selectAll } from '../store/city/city.reducer';
import { isPlatformBrowser } from '@angular/common';

export const citiesGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return of(false);
  }

  const checkStore = (): Observable<boolean> => {
    return store.select(selectAll).pipe(
      tap((cities: City[]) => {
        if (cities.length === 0) {
          store.dispatch(CityActions.startLoadCitys());
        }
      }),
      filter((cities: City[]) => cities.length !== 0),
      map(() => true)
    );
  };

  return checkStore().pipe(
    catchError(() => of(false))
  );
};