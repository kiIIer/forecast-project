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
import { CityActions } from './store/city/city.actions';
import { PopUpComponent } from './pop-up/pop-up.component';
import { PopUpService } from './services/pop-up.service';
import { selectAll, selectTotal } from './store/city/city.reducer';


@Component({
  standalone: true,
  imports: [RouterModule, MatButtonToggle, MatButton, AsyncPipe, MatLine, MatListItem, MatList, NgForOf, JsonPipe, NgIf, PopUpComponent],
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
              public popUpService: PopUpService) {
    if (isPlatformBrowser(this.platformId)) {
      // Conditionally inject AuthService only on the client side
      this.auth = inject(AuthService);
    }
  }

  ngOnInit() {
    this.store.dispatch(AuthActions.checkAuth());
    this.cities$ = this.store.select(selectAll);
  }

  protected readonly CityActions = CityActions;
  protected readonly selectTotal = selectTotal;
}

