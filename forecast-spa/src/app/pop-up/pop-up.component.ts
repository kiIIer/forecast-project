import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatDialogClose],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, content: string, type: string }) {
  }

}
