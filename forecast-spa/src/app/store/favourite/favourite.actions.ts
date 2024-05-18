import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Favourite } from './favourite.model';

export const FavouriteActions = createActionGroup({
  source: 'Favourite/API',
  events: {
    'Start Load Favourites': emptyProps(),
    'Load Favourites': props<{ favourites: Favourite[] }>(),
    'Start Add Favourite': props<{ favourite: Favourite }>(),
    'Add Favourite': props<{ favourite: Favourite }>(),
    'Upsert Favourite': props<{ favourite: Favourite }>(),
    'Add Favourites': props<{ favourites: Favourite[] }>(),
    'Upsert Favourites': props<{ favourites: Favourite[] }>(),
    'Update Favourite': props<{ favourite: Update<Favourite> }>(),
    'Update Favourites': props<{ favourites: Update<Favourite>[] }>(),
    'Start Delete Favourite': props<{ id: string }>(),
    'Delete Favourite': props<{ id: string }>(),
    'Delete Favourites': props<{ ids: string[] }>(),
    'Clear Favourites': emptyProps()
  }
});
