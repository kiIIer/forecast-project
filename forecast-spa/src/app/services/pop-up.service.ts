import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(private dialog: MatDialog) {

  }

  openDialog(title: string, content: string, type: 'default' | 'warning' | 'error' = 'default') {
    this.dialog.open(PopUpComponent, {
      data: { title, content, type }
    });
  }
}
