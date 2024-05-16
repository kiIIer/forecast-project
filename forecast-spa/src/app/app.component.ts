import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatButton } from '@angular/material/button';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  standalone: true,
  imports: [RouterModule, MatButtonToggle, MatButton],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'forecast-spa';

  constructor(public auth: AuthService) {
  }
}
