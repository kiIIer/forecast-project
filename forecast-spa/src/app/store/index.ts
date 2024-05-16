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

export const appStateFeatureKey = 'appState';

export interface State {
  router: RouterState;
  city: CityState;
  forecast: ForecastState;
  notification: NotificationState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  city: cityReducer,
  forecast: forecastReducer,
  notification: notificationReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
