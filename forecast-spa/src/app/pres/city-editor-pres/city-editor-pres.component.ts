import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from '../../store/city/city.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-city-editor-pres',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './city-editor-pres.component.html',
  styleUrl: './city-editor-pres.component.css'
})
export class CityEditorPresComponent implements OnInit {
  @Input() city: City | null = null;
  @Output() submitted = new EventEmitter<City>();

  cityForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.cityForm = this.fb.group({
      name: [this.city ? this.city.name : '']
    });
  }

  onSubmit(): void {
    if (this.cityForm.valid) {
      const cityData = this.cityForm.value;
      this.submitted.emit(cityData);
    }
  }
}