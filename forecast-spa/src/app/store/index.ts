import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { RouterState } from '@angular/router';
import { routerReducer } from '@ngrx/router-store';
import { cityReducer, CityState } from './city/city.reducer';
import { forecastReducer, ForecastState } from './forecast/forecast.reducer';
import { notificationReducer, notificationsFeature, NotificationState } from './notification/notification.reducer';
import { AuthEffects } from './auth/auth.effects';
import { authReducer, AuthState } from './auth/auth.reducer';

export const appStateFeatureKey = 'appState';

export const effects = [AuthEffects];

export interface State {
  router: RouterState;
  city: CityState;
  forecast: ForecastState;
  notification: NotificationState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  city: cityReducer,
  forecast: forecastReducer,
  notification: notificationReducer,
  auth: authReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
