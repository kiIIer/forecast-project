import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CityService } from '../../services/city.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { CityActions } from './city.actions';
import { PopUpService } from '../../services/pop-up.service';


@Injectable()
export class CityEffects {

  loadCities$ = createEffect(() => this.actions$.pipe(
    ofType(CityActions.startLoadCitys),
    switchMap(() => this.cityService.loadCities().pipe(
      map(cities => CityActions.loadCitys({ citys: cities })),
      catchError(() => {
        this.popUpService.openDialog('Error', 'Failed to load cities', 'error');
        return of(CityActions.loadCitys({ citys: [] }));
      })
    ))
  ));

  postCity$ = createEffect(() => this.actions$.pipe(
    ofType(CityActions.startAddCity),
    switchMap(({ city }) => this.cityService.postCity(city).pipe(
      map(() => CityActions.addCity({ city })),
      catchError(() => {
        this.popUpService.openDialog('Error', 'Failed to add city', 'error');
        return of(CityActions.addCity({ city }));
      })
    ))
  ));

  deleteCity$ = createEffect(() => this.actions$.pipe(
    ofType(CityActions.startDeleteCity),
    switchMap(({ id }) => this.cityService.deleteCity(id).pipe(
      map(() => CityActions.deleteCity({ id })),
      catchError(() => {
        this.popUpService.openDialog('Error', 'Failed to delete city', 'error');
        return of(CityActions.deleteCity({ id }));
      })
    ))
  ));


  constructor(private actions$: Actions, private cityService: CityService, private popUpService: PopUpService) {
  }
}
