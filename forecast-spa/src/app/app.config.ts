import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { effects, reducers } from './store';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthEffects } from './store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideEffects(effects),
    provideStore(reducers),
    provideStoreDevtools(),
    provideHttpClient(withFetch(), withInterceptors([authHttpInterceptorFn])),
    provideRouterStore(),
    provideClientHydration(),
    provideAnimationsAsync()
  ]
};