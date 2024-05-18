import { Component } from '@angular/core';
import { CityActions } from '../../store/city/city.actions';
import { Store } from '@ngrx/store';
import { DeletePresComponent } from '../../pres/delete-pres/delete-pres.component';

@Component({
  selector: 'app-delete-city-cont',
  standalone: true,
  imports: [
    DeletePresComponent
  ],
  templateUrl: './delete-city-cont.component.html',
  styleUrl: './delete-city-cont.component.css'
})
export class DeleteCityContComponent {
  constructor(private store: Store) {
  }

  onDeleteCity(id: number): void {
    this.store.dispatch(CityActions.startDeleteCity({ id: `${id}` }));
  }
}