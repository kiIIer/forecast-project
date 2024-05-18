import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatButton } from '@angular/material/button';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, isPlatformBrowser, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { CityService } from './services/city.service';
import { Observable } from 'rxjs';
import { City } from './store/city/city.model';
import { MatLine } from '@angular/material/core';
import { MatList, MatListItem } from '@angular/material/list';
import { AuthActions } from './store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { CityActions } from './store/city/city.actions';
import { PopUpComponent } from './pop-up/pop-up.component';
import { PopUpService } from './services/pop-up.service';
import { selectAll as CitySelectAll, selectTotal } from './store/city/city.reducer';
import { CitiesPresComponent } from './pres/cities-pres/cities-pres.component';
import { ForecastActions } from './store/forecast/forecast.actions';
import { ForecastsPresComponent } from './pres/forecasts-pres/forecasts-pres.component';
import { Forecast } from './store/forecast/forecast.model';
import { selectAll } from './store/forecast/forecast.reducer';
import { ForecastEditorPresComponent } from './pres/forecast-editor-pres/forecast-editor-pres.component';
import { ForecastDetailsPresComponent } from './pres/forecast-details-pres/forecast-details-pres.component';
import { ToolbarPresComponent } from './pres/toolbar-pres/toolbar-pres.component';


@Component({
  standalone: true,
  imports: [RouterModule, MatButtonToggle, MatButton, AsyncPipe, MatLine, MatListItem, MatList, NgForOf, JsonPipe, NgIf, PopUpComponent, CitiesPresComponent, ForecastsPresComponent, ForecastEditorPresComponent, ForecastDetailsPresComponent, ToolbarPresComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'forecast-spa';

  auth: AuthService | null = null;
  cities$: Observable<City[]> | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: NonNullable<unknown>,
              public cityService: CityService,
              protected store: Store,
              public popUpService: PopUpService,
              public router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      // Conditionally inject AuthService only on the client side
      this.auth = inject(AuthService);
    }
  }

  ngOnInit() {
    this.store.dispatch(AuthActions.checkAuth());
    this.cities$ = this.store.select(CitySelectAll);
    this.forecasts$ = this.store.select(selectAll);
  }

  test() {
    // this.store.dispatch(ForecastActions.startAddForecast({
    //   forecast: {
    //     id: 0,
    //     cityId: 2,
    //     dateOfForecast: '2021-01-01',
    //     temperature: 20,
    //     chanceOfRain: 0.5
    //   }
    // }));

    this.store.dispatch(ForecastActions.startLoadForecasts());
  }

  protected readonly CityActions = CityActions;
  forecasts$: Observable<Forecast[]> | undefined;
  protected readonly ForecastActions = ForecastActions;
}

