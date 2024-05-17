import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
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


@Component({
  standalone: true,
  imports: [RouterModule, MatButtonToggle, MatButton, AsyncPipe, MatLine, MatListItem, MatList, NgForOf, JsonPipe, NgIf],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'forecast-spa';
  testCity = {
    name: 'Test City 3'
  } as City;

  auth: AuthService | null = null;
  cities$: Observable<City[]> | null = null;
  postCity$: Observable<City> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: NonNullable<unknown>, public cityService: CityService, private store: Store) {
    if (isPlatformBrowser(this.platformId)) {
      // Conditionally inject AuthService only on the client side
      this.auth = inject(AuthService);
    }
  }

  ngOnInit() {
    this.store.dispatch(AuthActions.checkAuth());
  }
}

