import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, filter, map, Observable, of, scheduled, switchMap, tap } from 'rxjs';
import { City } from '../store/city/city.model';
import { CityActions } from '../store/city/city.actions';
import { selectAll } from '../store/city/city.reducer';

export const citiesGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store);


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