import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Forecast } from '../../store/forecast/forecast.model';

@Component({
  selector: 'app-forecast-editor-pres',
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
  templateUrl: './forecast-editor-pres.component.html',
  styleUrls: ['./forecast-editor-pres.component.css']
})
export class ForecastEditorPresComponent implements OnInit {
  @Input() forecast: Forecast | null = null;
  @Output() submitted = new EventEmitter<Forecast>();

  forecastForm!: FormGroup;

  constructor(private fb: FormBuilder, private adapter: DateAdapter<any>) {
    this.adapter.setLocale('en-GB'); // Set the locale to 'en-GB' for dd/MM/yyyy format
  }

  ngOnInit(): void {
    this.forecastForm = this.fb.group({
      cityId: [this.forecast ? this.forecast.cityId : null, Validators.required],
      dateOfForecast: [this.forecast ? new Date(this.forecast.dateOfForecast) : null, Validators.required],
      temperature: [this.forecast ? this.forecast.temperature : null, [Validators.required, Validators.min(-100), Validators.max(100)]],
      chanceOfRain: [this.forecast ? this.forecast.chanceOfRain : null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onSubmit(): void {
    if (this.forecastForm.valid) {
      const formValues = this.forecastForm.value;
      const formattedDate = this.formatDate(formValues.dateOfForecast);
      const forecastData = {
        ...formValues,
        dateOfForecast: formattedDate
      };
      console.log(forecastData);
      this.submitted.emit(forecastData);
    }
  }
}
