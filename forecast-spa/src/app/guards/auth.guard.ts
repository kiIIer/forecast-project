import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { catchError, filter, map, Observable, of, switchMap, take } from 'rxjs';
import { selectIsLoggedIn, selectLoaded } from '../store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const store = inject(Store);

  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return of(false);
  }

  return store.select(selectLoaded).pipe(
    filter(loaded => loaded), // Wait until the loaded state is true
    take(1), // Take the first emitted value that satisfies the filter
    switchMap(() =>
      store.select(selectIsLoggedIn).pipe(
        map(isLoggedIn => isLoggedIn),
        catchError(() => of(false))
      )
    )
  );
};