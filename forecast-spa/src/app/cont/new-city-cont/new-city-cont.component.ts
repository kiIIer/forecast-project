import { Component } from '@angular/core';
import { CityEditorPresComponent } from '../../pres/city-editor-pres/city-editor-pres.component';
import { Store } from '@ngrx/store';
import { CityActions } from '../../store/city/city.actions';
import { City } from '../../store/city/city.model';

@Component({
  selector: 'app-new-city-cont',
  standalone: true,
  imports: [
    CityEditorPresComponent
  ],
  templateUrl: './new-city-cont.component.html',
  styleUrl: './new-city-cont.component.css'
})
export class NewCityContComponent {
  constructor(private store: Store) {
  }

  onSubmitted(city: City): void {
    this.store.dispatch(CityActions.startAddCity({ city }));
  }
}
