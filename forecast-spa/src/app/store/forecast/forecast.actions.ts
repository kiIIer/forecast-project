import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Forecast } from './forecast.model';

export const ForecastActions = createActionGroup({
  source: 'Forecast/API',
  events: {
    'Start Load Forecasts': emptyProps(),
    'Load Forecasts': props<{ forecasts: Forecast[] }>(),
    'Start Add Forecast': props<{ forecast: Forecast }>(),
    'Add Forecast': props<{ forecast: Forecast }>(),
    'Upsert Forecast': props<{ forecast: Forecast }>(),
    'Add Forecasts': props<{ forecasts: Forecast[] }>(),
    'Upsert Forecasts': props<{ forecasts: Forecast[] }>(),
    'Update Forecast': props<{ forecast: Update<Forecast> }>(),
    'Update Forecasts': props<{ forecasts: Update<Forecast>[] }>(),
    'Start Delete Forecast': props<{ id: string }>(),
    'Delete Forecast': props<{ id: string }>(),
    'Delete Forecasts': props<{ ids: string[] }>(),
    'Clear Forecasts': emptyProps(),
  }
});
