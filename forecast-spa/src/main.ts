import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';

const superConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideAuth0({
      domain: 'forecast-project.eu.auth0.com',
      clientId: 'PUZtYAMIV0G5qyFGXNz1AmZJ2BnCe6rC',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ]
};

bootstrapApplication(AppComponent, superConfig).catch((err) =>
  console.error(err)
);
