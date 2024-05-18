import { Route } from '@angular/router';
import { CitiesPresComponent } from './pres/cities-pres/cities-pres.component';
import { citiesGuard } from './guards/cities.guard';

export const appRoutes: Route[] = [
  {
    path: 'home',
    component: CitiesPresComponent,
    canActivate: [citiesGuard]
  }
];
