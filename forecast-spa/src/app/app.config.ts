import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { reducers } from './store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideEffects(),
    provideStore(reducers),
    provideStoreDevtools(),
    provideRouterStore(),
    provideClientHydration(),
    provideAnimationsAsync()
  ]
};
