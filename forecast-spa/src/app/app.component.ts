import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MatButtonToggle } from '@angular/material/button-toggle';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, MatButtonToggle],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'forecast-spa';
}
