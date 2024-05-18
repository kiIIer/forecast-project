import { Route } from '@angular/router';
import { citiesGuard } from './guards/cities.guard';
import { HomeContComponent } from './cont/home-cont/home-cont.component';
import { ForecastsContComponent } from './cont/forecasts-cont/forecasts-cont.component';
import { forecastsGuard } from './guards/forecasts.guard';
import { CityDetailsComponent } from './cont/city-details/city-details.component';
import { ForecastDetailsContComponent } from './cont/forecast-details-cont/forecast-details-cont.component';
import { NewForecastContComponent } from './cont/new-forecast-cont/new-forecast-cont.component';
import { NewCityContComponent } from './cont/new-city-cont/new-city-cont.component';
import { favouritesGuard } from './guards/favouritesGuard';
import { DeleteCityContComponent } from './cont/delete-city-cont/delete-city-cont.component';
import { DeleteForecastContComponent } from './cont/delete-forecast-cont/delete-forecast-cont.component';

export const appRoutes: Route[] = [
  {
    path: 'home',
    component: HomeContComponent,
    canActivate: [citiesGuard, favouritesGuard]
  },
  {
    path: 'forecasts',
    component: ForecastsContComponent,
    canActivate: [forecastsGuard]
  },
  {
    path: 'cities/create',
    component: NewCityContComponent
  },
  {
    path: 'cities/delete',
    component: DeleteCityContComponent
  },
  {
    path: 'cities/:city_id',
    component: CityDetailsComponent,
    canActivate: [citiesGuard, forecastsGuard]
  },
  {
    path: 'forecasts/create',
    component: NewForecastContComponent
  },
  {
    path: 'forecasts/delete',
    component: DeleteForecastContComponent
  },
  {
    path: 'forecasts/:forecast_id',
    component: ForecastDetailsContComponent,
    canActivate: [citiesGuard, forecastsGuard]
  }
];
