import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-delete-pres',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton
  ],
  templateUrl: './delete-pres.component.html',
  styleUrl: './delete-pres.component.css'
})
export class DeletePresComponent {
  @Input() title: string = 'Delete Item';
  @Output() deleteItem = new EventEmitter<number>();

  deleteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.deleteForm = this.fb.group({
      id: ['', Validators.required]
    });
  }

  onDelete(): void {
    if (this.deleteForm.valid) {
      this.deleteItem.emit(this.deleteForm.value.id);
    }
  }
}