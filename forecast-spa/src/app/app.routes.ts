import { Route } from '@angular/router';
import { citiesGuard } from './guards/cities.guard';
import { HomeContComponent } from './cont/home-cont/home-cont.component';
import { ForecastsContComponent } from './cont/forecasts-cont/forecasts-cont.component';
import { forecastsGuard } from './guards/forecasts.guard';

export const appRoutes: Route[] = [
  {
    path: 'home',
    component: HomeContComponent,
    canActivate: [citiesGuard]
  },
  {
    path: 'forecasts',
    component: ForecastsContComponent,
    canActivate: [forecastsGuard]
  }
];
