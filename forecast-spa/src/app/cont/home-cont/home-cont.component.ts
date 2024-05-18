import { Component } from '@angular/core';
import { CitiesPresComponent } from '../../pres/cities-pres/cities-pres.component';
import { Store } from '@ngrx/store';
import { selectAll } from '../../store/city/city.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home-cont',
  standalone: true,
  imports: [
    CitiesPresComponent,
    AsyncPipe
  ],
  templateUrl: './home-cont.component.html',
  styleUrl: './home-cont.component.css'
})
export class HomeContComponent {
  cities$ = this.store.select(selectAll);

  constructor(private store: Store) {
  }
}
