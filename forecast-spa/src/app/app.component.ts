import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatButton } from '@angular/material/button';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Component({
  standalone: true,
  imports: [RouterModule, MatButtonToggle, MatButton],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'forecast-spa';

  auth: AuthService | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: NonNullable<unknown>) {
    if (isPlatformBrowser(this.platformId)) {
      // Conditionally inject AuthService only on the client side
      this.auth = inject(AuthService);
    }
  }
}

