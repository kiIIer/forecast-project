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
        redirect_uri: window.location.origin,
        audience: 'http://localhost:8080'
      },
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://{yourDomain}/api/v2/' (note the asterisk)
            uri: 'http://localhost:8080/*',
            httpMethod: 'POST',
            tokenOptions: {
              authorizationParams: {
                audience: 'http://localhost:8080'
              }
            }
          },
          {
            // Match any request that starts 'https://{yourDomain}/api/v2/' (note the asterisk)
            uri: 'http://localhost:8080/*',
            httpMethod: 'DELETE',
            tokenOptions: {
              authorizationParams: {
                audience: 'http://localhost:8080'
              }
            }
          },
          {
            // Match any request that starts 'https://{yourDomain}/api/v2/' (note the asterisk)
            uri: 'http://localhost:8080/favourites',
            httpMethod: 'GET',
            tokenOptions: {
              authorizationParams: {
                audience: 'http://localhost:8080'
              }
            }
          },
          {
            // Match any request that starts 'https://{yourDomain}/api/v2/' (note the asterisk)
            uri: 'http://localhost:8080/upcoming-forecasts',
            httpMethod: 'GET',
            tokenOptions: {
              authorizationParams: {
                audience: 'http://localhost:8080'
              }
            }
          }
        ]
      }
    })
  ]
};

bootstrapApplication(AppComponent, superConfig).catch((err) =>
  console.error(err)
);
