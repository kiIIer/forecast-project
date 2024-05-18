import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { City } from '../../store/city/city.model';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatInput } from '@angular/material/input';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-toolbar-pres',
  standalone: true,
  imports: [
    MatMenuItem,
    MatMenu,
    MatMenuTrigger,
    MatButton,
    MatPrefix,
    MatFormField,
    MatIcon,
    MatToolbar,
    MatInput,
    ReactiveFormsModule,
    MatAutocomplete,
    MatOption,
    NgForOf,
    AsyncPipe,
    MatAutocompleteTrigger,
    MatDivider,
    NgIf
  ],
  templateUrl: './toolbar-pres.component.html',
  styleUrl: './toolbar-pres.component.css'
})
export class ToolbarPresComponent {
  @Input({ transform: (value: City[] | null): City[] => value ? value : [] }) cities: City[] = [];
  @Input({ transform: booleanAttribute }) isLoggedIn = false;
  @Input({ transform: booleanAttribute }) isAdmin = false;
  @Input() user: any = null;

  @Output() cityChosen = new EventEmitter<City>();
  @Output() favouritesClicked = new EventEmitter<void>();
  @Output() notificationsClicked = new EventEmitter<void>();
  @Output() loginClicked = new EventEmitter<void>();
  @Output() logoutClicked = new EventEmitter<void>();
  @Output() adminCreateCity = new EventEmitter<void>();
  @Output() adminDeleteCity = new EventEmitter<void>();
  @Output() adminCreateForecast = new EventEmitter<void>();
  @Output() adminDeleteForecast = new EventEmitter<void>();
  @Output() homeClicked = new EventEmitter<void>();


  myControl = new FormControl<string | City>('');
  filteredCities!: Observable<City[]>;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.cities.slice();
      })
    );
  }

  displayFn(city: City): string {
    return city && city.name ? city.name : '';
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();
    return this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
  }

  onCitySelected(city: City): void {
    this.cityChosen.emit(city);
  }

  onFavouritesClicked(): void {
    this.favouritesClicked.emit();
  }

  onNotificationsClicked(): void {
    this.notificationsClicked.emit();
  }

  onLoginClicked(): void {
    this.loginClicked.emit();
  }

  onLogoutClicked(): void {
    this.logoutClicked.emit();
  }

  onAdminCreateCity(): void {
    this.adminCreateCity.emit();
  }

  onAdminDeleteCity(): void {
    this.adminDeleteCity.emit();
  }

  onAdminCreateForecast(): void {
    this.adminCreateForecast.emit();
  }

  onAdminDeleteForecast(): void {
    this.adminDeleteForecast.emit();
  }

  onHomeClicked(): void {
    this.homeClicked.emit();
  }
}