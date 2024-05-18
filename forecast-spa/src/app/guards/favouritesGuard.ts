import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import { catchError, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { City } from '../store/city/city.model';
import { CityActions } from '../store/city/city.actions';
import { selectAll } from '../store/favourite/favourite.reducer';
import { Favourite } from '../store/favourite/favourite.model';
import { FavouriteActions } from '../store/favourite/favourite.actions';
import { selectIsLoggedIn } from '../store/auth/auth.reducer';

export const favouritesGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return of(false); // Allow navigation if not in the browser
  }

  const checkStore = (): Observable<boolean> => {
    store.dispatch(FavouriteActions.startLoadFavourites());
    console.log('favouritesGuard');
    return store.select(selectAll).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  };


  return checkStore();
};