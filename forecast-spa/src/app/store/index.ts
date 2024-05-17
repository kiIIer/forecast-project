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
import { CityEffects } from './city/city.effects';
import { ForecastEffects } from './forecast/forecast.effects';
import { NotificationEffects } from './notification/notification.effects';
import { favouriteReducer, FavouriteState } from './favourite/favourite.reducer';

export const appStateFeatureKey = 'appState';

export const effects = [AuthEffects, CityEffects, ForecastEffects, NotificationEffects];

export interface State {
  router: RouterState;
  cities: CityState;
  forecasts: ForecastState;
  notifications: NotificationState;
  auth: AuthState;
  favourites: FavouriteState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  cities: cityReducer,
  forecasts: forecastReducer,
  notifications: notificationReducer,
  auth: authReducer,
  favourites: favouriteReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
