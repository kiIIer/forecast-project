import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { City } from './city.model';

export const CityActions = createActionGroup({
  source: 'City/API',
  events: {
    'Load Citys': props<{ citys: City[] }>(),
    'Add City': props<{ city: City }>(),
    'Upsert City': props<{ city: City }>(),
    'Add Citys': props<{ citys: City[] }>(),
    'Upsert Citys': props<{ citys: City[] }>(),
    'Update City': props<{ city: Update<City> }>(),
    'Update Citys': props<{ citys: Update<City>[] }>(),
    'Delete City': props<{ id: string }>(),
    'Delete Citys': props<{ ids: string[] }>(),
    'Clear Citys': emptyProps(),
  }
});
