import { Component } from '@angular/core';
import { CitiesPresComponent } from '../../pres/cities-pres/cities-pres.component';
import { Store } from '@ngrx/store';
import { selectAll as selectAllCities } from '../../store/city/city.reducer';
import { AsyncPipe } from '@angular/common';
import { RouterActions } from '../../store/router/router.actions';
import { City } from '../../store/city/city.model';
import { FavouriteActions } from '../../store/favourite/favourite.actions';
import { selectAll as selectAllFavourites } from '../../store/favourite/favourite.reducer';
import { map, take } from 'rxjs';
import { selectIsLoggedIn } from '../../store/auth/auth.reducer';

@Component({
  selector: 'app-home-cont',
  standalone: true,
  imports: [
    CitiesPresComponent,
    AsyncPipe
  ],
  templateUrl: './home-cont.component.html',
  styleUrl: './home-cont.component.css'
})
export class HomeContComponent {
  cities$ = this.store.select(selectAllCities);
  favourites$ = this.store.select(selectAllFavourites);
  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  constructor(private store: Store) {
  }

  onCityChosen(city: City) {
    this.store.dispatch(RouterActions.navigateByUrl({ url: `/cities/${city.id}` }));
  }

  onAddFavourite(city: City) {
    this.store.dispatch(FavouriteActions.startAddFavourite({ favourite: { id: city.id } }));
  }

  onRemoveFavourite(city: City) {
    this.store.dispatch(FavouriteActions.startDeleteFavourite({ id: `${city.id}` }));
  }
}