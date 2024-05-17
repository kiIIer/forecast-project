import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Favourite } from './favourite.model';
import { FavouriteActions } from './favourite.actions';

export const favouritesFeatureKey = 'favourites';

export interface FavouriteState extends EntityState<Favourite> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Favourite> = createEntityAdapter<Favourite>();

export const initialState: FavouriteState = adapter.getInitialState({
  // additional entity state properties
});

export const favouriteReducer = createReducer(
  initialState,
  on(FavouriteActions.addFavourite,
    (state, action) => adapter.addOne(action.favourite, state)
  ),
  on(FavouriteActions.upsertFavourite,
    (state, action) => adapter.upsertOne(action.favourite, state)
  ),
  on(FavouriteActions.addFavourites,
    (state, action) => adapter.addMany(action.favourites, state)
  ),
  on(FavouriteActions.upsertFavourites,
    (state, action) => adapter.upsertMany(action.favourites, state)
  ),
  on(FavouriteActions.updateFavourite,
    (state, action) => adapter.updateOne(action.favourite, state)
  ),
  on(FavouriteActions.updateFavourites,
    (state, action) => adapter.updateMany(action.favourites, state)
  ),
  on(FavouriteActions.deleteFavourite,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(FavouriteActions.deleteFavourites,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(FavouriteActions.loadFavourites,
    (state, action) => adapter.setAll(action.favourites, state)
  ),
  on(FavouriteActions.clearFavourites,
    state => adapter.removeAll(state)
  ),
);

export const favouritesFeature = createFeature({
  name: favouritesFeatureKey,
  reducer: favouriteReducer,
  extraSelectors: ({ selectFavouritesState }) => ({
    ...adapter.getSelectors(selectFavouritesState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = favouritesFeature;
