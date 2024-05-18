import { Component } from '@angular/core';
import { ToolbarPresComponent } from '../../pres/toolbar-pres/toolbar-pres.component';
import { Store } from '@ngrx/store';
import { selectAll as selectAllCities } from '../../store/city/city.reducer';
import { selectIsAdmin, selectIsLoggedIn, selectUserProfile } from '../../store/auth/auth.reducer';
import { AsyncPipe } from '@angular/common';
import { City } from '../../store/city/city.model';
import { RouterActions } from '../../store/router/router.actions';
import { AuthActions } from '../../store/auth/auth.actions';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-toolbar-cont',
  standalone: true,
  imports: [
    ToolbarPresComponent,
    AsyncPipe,
    RouterOutlet
  ],
  templateUrl: './toolbar-cont.component.html',
  styleUrl: './toolbar-cont.component.css'
})
export class ToolbarContComponent {
  cities$ = this.store.select(selectAllCities);
  user$ = this.store.select(selectUserProfile);
  isAdmin$ = this.store.select(selectIsAdmin);
  isLogged$ = this.store.select(selectIsLoggedIn);

  constructor(private store: Store) {
  }

  onCityChosen(city: City): void {
    this.store.dispatch(RouterActions.navigateByUrl({ url: `/cities/${city.id}` }));
  }

  onFavouritesClicked(): void {
    this.store.dispatch(RouterActions.navigateByUrl({ url: '/favourites' }));
  }

  onNotificationsClicked(): void {
    this.store.dispatch(RouterActions.navigateByUrl({ url: '/notifications' }));
  }

  onLoginClicked(): void {
    this.store.dispatch(AuthActions.login());
  }

  onLogoutClicked(): void {
    this.store.dispatch(AuthActions.logout());
  }

  onAdminCreateCity(): void {
    this.store.dispatch(RouterActions.navigateByUrl({ url: '/cities/create' }));
  }

  onAdminDeleteCity(): void {
    this.store.dispatch(RouterActions.navigateByUrl({ url: '/cities/delete' }));
  }

  onAdminCreateForecast(): void {
    this.store.dispatch(RouterActions.navigateByUrl({ url: '/forecasts/create' }));
  }

  onAdminDeleteForecast(): void {
    this.store.dispatch(RouterActions.navigateByUrl({ url: '/forecasts/delete' }));
  }

  onHomeClicked(): void {
    this.store.dispatch(RouterActions.navigateByUrl({ url: '/home' }));
  }
}
