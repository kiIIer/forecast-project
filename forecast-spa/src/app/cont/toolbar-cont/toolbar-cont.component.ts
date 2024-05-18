import { Component } from '@angular/core';
import { ToolbarPresComponent } from '../../pres/toolbar-pres/toolbar-pres.component';
import { Store } from '@ngrx/store';
import { selectAll as selectAllCities } from '../../store/city/city.reducer';
import { selectIsAdmin, selectIsLoggedIn, selectUserProfile } from '../../store/auth/auth.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toolbar-cont',
  standalone: true,
  imports: [
    ToolbarPresComponent,
    AsyncPipe
  ],
  templateUrl: './toolbar-cont.component.html',
  styleUrl: './toolbar-cont.component.css'
})
export class ToolbarContComponent {
  cities$ = this.store.select(selectAllCities);
  user$ = this.store.select(selectUserProfile);
  isAdmin$ = this.store.select(selectIsAdmin);
  isLogged$ = this.store.select(selectIsLoggedIn);

  constructor(private store: Store) {
  }
}
