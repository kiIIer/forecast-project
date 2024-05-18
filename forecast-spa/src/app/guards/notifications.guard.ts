import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { catchError, filter, Observable, of, switchMap, take } from 'rxjs';
import { inject, PLATFORM_ID } from '@angular/core';
import { selectIsLoggedIn, selectLoaded } from '../store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { NotificationActions } from '../store/notification/notification.actions';

export const notificationsGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const store = inject(Store);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return of(false); // Deny navigation if not in the browser
  }

  return store.select(selectLoaded).pipe(
    filter(loaded => loaded), // Wait until the loaded state is true
    take(1), // Take the first emitted value that satisfies the filter
    switchMap(() =>
      store.select(selectIsLoggedIn).pipe(
        switchMap(isLoggedIn => {
          if (isLoggedIn) {
            store.dispatch(NotificationActions.startLoadNotifications());
            return of(true);
          } else {
            return of(false); // Deny navigation if not logged in
          }
        }),
        catchError(() => of(false))
      )
    )
  );
};