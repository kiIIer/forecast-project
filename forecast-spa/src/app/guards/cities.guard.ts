import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, scheduled, asyncScheduler } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, catchError, tap } from 'rxjs/operators';
import { selectAll } from '../store/city/city.reducer';
import { City } from '../store/city/city.model';
import { CityActions } from '../store/city/city.actions';

@Injectable({
  providedIn: 'root'
})
export class CitiesGuard implements CanActivate {

  constructor(private store: Store) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkStore().pipe(
      switchMap(() => scheduled<boolean>([true], asyncScheduler)),
      catchError(() => scheduled<boolean>([false], asyncScheduler))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.store.select(selectAll).pipe(
      tap((cities: City[]) => {
        if (cities.length === 0) {
          this.store.dispatch(CityActions.startLoadCitys());
        }
      }),
      filter((cities: City[]) => cities.length !== 0),
      map(() => true)
    );
  }
}
