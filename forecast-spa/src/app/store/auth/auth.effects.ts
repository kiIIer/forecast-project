import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CityService } from '../../services/city.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { AuthActions } from './auth.actions';
import { combineLatestWith, map, Observable, of, switchMap, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable()
export class AuthEffects {
  private auth: AuthService | null = null;

  getIsAdmin$(): Observable<boolean> {
    if (!this.auth) {
      return of(false);
    }

    return this.auth.isAuthenticated$.pipe(
      switchMap((isAuthed: boolean) =>
        isAuthed
          ? this.auth!.getAccessTokenSilently().pipe(
            tap((token) => console.log(token)),
            map((token: string) =>
              (jwtDecode(token) as any).permissions.includes('admin')
            )
          )
          : of(false)
      )
    );
  }


  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    tap(() => this.auth?.loginWithRedirect())
  ), { dispatch: false });

  checkAuth$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.checkAuth),
      switchMap(() => this.auth ? this.auth.isAuthenticated$.pipe(
        combineLatestWith(this.auth.user$),
        combineLatestWith(this.getIsAdmin$())
      ) : []),
      switchMap(([[is_authenticated, user], isAdmin]) => {
          if (is_authenticated) {
            return of(AuthActions.loginComplete({ user, isLoggedIn: true, isAdmin }));
          }

          return of(AuthActions.logoutComplete());
        }
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.auth?.logout()),
      switchMap(() => of(AuthActions.logoutComplete()))
    )
  );

  constructor(private actions$: Actions, @Inject(PLATFORM_ID) private platformId: NonNullable<unknown>) {
    if (isPlatformBrowser(this.platformId)) {
      this.auth = inject(AuthService);

    }
  }
}
