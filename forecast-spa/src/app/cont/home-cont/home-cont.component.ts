import { Component } from '@angular/core';
import { CitiesPresComponent } from '../../pres/cities-pres/cities-pres.component';
import { Store } from '@ngrx/store';
import { selectAll } from '../../store/city/city.reducer';
import { AsyncPipe } from '@angular/common';
import { RouterActions } from '../../store/router/router.actions';
import { City } from '../../store/city/city.model';

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
  cities$ = this.store.select(selectAll);

  constructor(private store: Store) {
  }

  onCityChosen(city: City) {
    this.store.dispatch(RouterActions.navigateByUrl({ url: `/cities/${city.id}` }));
  }

  onToggleFavourite(city: City) {
    // this.store.dispatch(CityActions.toggleFavourite({ city }));
  }
}
