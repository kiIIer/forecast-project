import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { RouterActions } from './router.actions';
import { Router } from '@angular/router';


@Injectable()
export class RouterEffects {

  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(RouterActions.navigateByUrl),
    tap(({ url }) => this.router.navigateByUrl(url))
  ), { dispatch: false });

  constructor(private actions$: Actions, private router: Router) {
  }
}
