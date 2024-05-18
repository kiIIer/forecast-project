import { Component } from '@angular/core';
import { FavouriteActions } from '../../store/favourite/favourite.actions';
import { City } from '../../store/city/city.model';
import { RouterActions } from '../../store/router/router.actions';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAll as selectAllCities } from '../../store/city/city.reducer';
import { selectAll as selectAllFavourites } from '../../store/favourite/favourite.reducer';
import { selectIsLoggedIn } from '../../store/auth/auth.reducer';
import { CitiesPresComponent } from '../../pres/cities-pres/cities-pres.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-favourites-cont',
  standalone: true,
  imports: [
    CitiesPresComponent,
    AsyncPipe
  ],
  templateUrl: './favourites-cont.component.html',
  styleUrl: './favourites-cont.component.css'
})
export class FavouritesContComponent {
  favourites$: Observable<City[]>;
  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  constructor(private store: Store) {
    this.favourites$ = combineLatest([
      this.store.select(selectAllCities),
      this.store.select(selectAllFavourites)
    ]).pipe(
      map(([cities, favourites]) =>
        cities.filter(city => favourites.some(fav => fav.id === city.id))
      )
    );
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