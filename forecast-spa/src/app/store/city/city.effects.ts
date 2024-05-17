import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CityService } from '../../services/city.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { CityActions } from './city.actions';


@Injectable()
export class CityEffects {

  loadCities$ = createEffect(() => this.actions$.pipe(
    ofType(CityActions.startLoadCitys)
    // switchMap(() => this.cityService.loadCities().pipe(
    // map(cities => CityActions.loadCitys({ citys: cities })),
    // catchError(error => of(CityActions.loadCitysFailure({ error })))
    // ))
  ));


  constructor(private actions$: Actions, private cityService: CityService) {
  }
}
