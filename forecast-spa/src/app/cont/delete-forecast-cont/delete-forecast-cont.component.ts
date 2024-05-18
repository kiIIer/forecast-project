import { Component } from '@angular/core';
import { ForecastActions } from '../../store/forecast/forecast.actions';
import { Store } from '@ngrx/store';
import { DeletePresComponent } from '../../pres/delete-pres/delete-pres.component';

@Component({
  selector: 'app-delete-forecast-cont',
  standalone: true,
  imports: [
    DeletePresComponent
  ],
  templateUrl: './delete-forecast-cont.component.html',
  styleUrl: './delete-forecast-cont.component.css'
})
export class DeleteForecastContComponent {
  constructor(private store: Store) {
  }

  onDeleteForecast(id: number): void {
    this.store.dispatch(ForecastActions.startDeleteForecast({ id: `${id}` }));
  }
}