import { Component } from '@angular/core';
import { RouterActions } from '../../store/router/router.actions';
import { Forecast } from '../../store/forecast/forecast.model';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAll as selectAllForecasts } from '../../store/forecast/forecast.reducer';
import { selectAll as selectAllNotifications } from '../../store/notification/notification.reducer';
import { ForecastsPresComponent } from '../../pres/forecasts-pres/forecasts-pres.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-notifications-cont',
  standalone: true,
  imports: [
    ForecastsPresComponent,
    AsyncPipe
  ],
  templateUrl: './notifications-cont.component.html',
  styleUrl: './notifications-cont.component.css'
})
export class NotificationsContComponent {
  forecasts$: Observable<Forecast[]>;

  constructor(private store: Store) {
    this.forecasts$ = combineLatest([
      this.store.select(selectAllForecasts),
      this.store.select(selectAllNotifications)
    ]).pipe(
      map(([forecasts, notifications]) =>
        forecasts.filter(forecast => notifications.some(notification => notification.id === forecast.id))
      )
    );
  }

  onForecastChosen(forecast: Forecast) {
    this.store.dispatch(RouterActions.navigateByUrl({ url: `/forecasts/${forecast.id}` }));
  }
}