import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavouriteActions } from './favourite.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { PopUpService } from '../../services/pop-up.service';
import { UserService } from '../../services/user.service';


@Injectable()
export class FavouriteEffects {

  loadFavourites$ = createEffect(() => this.actions$.pipe(
    ofType(FavouriteActions.startLoadFavourites),
    switchMap(() => this.userService.loadFavourites().pipe(
      map(favourites => FavouriteActions.loadFavourites({ favourites })),
      catchError(() => {
        this.popUpService.openDialog('Error', 'Failed to load favourites', 'error');
        return of(FavouriteActions.loadFavourites({ favourites: [] }));
      })
    ))
  ));

  addFavourite$ = createEffect(() => this.actions$.pipe(
    ofType(FavouriteActions.startAddFavourite),
    switchMap(({ favourite }) => this.userService.postFavorite(favourite).pipe(
      map(favourite => FavouriteActions.addFavourite({ favourite })),
      catchError(() => {
        this.popUpService.openDialog('Error', 'Failed to add favourite', 'error');
        return of(FavouriteActions.addFavourite({ favourite }));
      })
    ))
  ));

  deleteFavourite$ = createEffect(() => this.actions$.pipe(
    ofType(FavouriteActions.startDeleteFavourite),
    switchMap(({ id }) => this.userService.deleteFavorite(id).pipe(
      map(() => FavouriteActions.deleteFavourite({ id })),
      catchError(() => {
        this.popUpService.openDialog('Error', 'Failed to delete favourite', 'error');
        return of(FavouriteActions.deleteFavourite({ id }));
      })
    ))
  ));

  constructor(private actions$: Actions, private userService: UserService, private popUpService: PopUpService
  ) {
  }
}
