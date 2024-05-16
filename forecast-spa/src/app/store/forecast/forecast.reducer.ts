import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Forecast } from './forecast.model';
import { ForecastActions } from './forecast.actions';

export const forecastsFeatureKey = 'forecasts';

export interface ForecastState extends EntityState<Forecast> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Forecast> = createEntityAdapter<Forecast>();

export const initialState: ForecastState = adapter.getInitialState({
  // additional entity state properties
});

export const forecastReducer = createReducer(
  initialState,
  on(ForecastActions.addForecast,
    (state, action) => adapter.addOne(action.forecast, state)
  ),
  on(ForecastActions.upsertForecast,
    (state, action) => adapter.upsertOne(action.forecast, state)
  ),
  on(ForecastActions.addForecasts,
    (state, action) => adapter.addMany(action.forecasts, state)
  ),
  on(ForecastActions.upsertForecasts,
    (state, action) => adapter.upsertMany(action.forecasts, state)
  ),
  on(ForecastActions.updateForecast,
    (state, action) => adapter.updateOne(action.forecast, state)
  ),
  on(ForecastActions.updateForecasts,
    (state, action) => adapter.updateMany(action.forecasts, state)
  ),
  on(ForecastActions.deleteForecast,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ForecastActions.deleteForecasts,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ForecastActions.loadForecasts,
    (state, action) => adapter.setAll(action.forecasts, state)
  ),
  on(ForecastActions.clearForecasts,
    state => adapter.removeAll(state)
  ),
);

export const forecastsFeature = createFeature({
  name: forecastsFeatureKey,
  reducer: forecastReducer,
  extraSelectors: ({ selectForecastsState }) => ({
    ...adapter.getSelectors(selectForecastsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = forecastsFeature;
