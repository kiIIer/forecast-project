import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationActions } from './notification.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { PopUpService } from '../../services/pop-up.service';
import { UserService } from '../../services/user.service';


@Injectable()
export class NotificationEffects {

  loadNotifications$ = createEffect(() => this.actions$.pipe(
    ofType(NotificationActions.startLoadNotifications),
    switchMap(() => this.userService.loadNotifications().pipe(
      map(notifications => NotificationActions.loadNotifications({ notifications })),
      catchError(() => {
        this.popUpService.openDialog('Error', 'Failed to load notifications', 'error');
        return of(NotificationActions.loadNotifications({ notifications: [] }));
      })
    ))
  ));

  constructor(private actions$: Actions, private userService: UserService, private popUpService: PopUpService
  ) {
  }
}
