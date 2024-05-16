import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { City } from './city.model';
import { CityActions } from './city.actions';

export const citiesFeatureKey = 'cities';

export interface CityState extends EntityState<City> {
  // additional entities state properties
}

export const adapter: EntityAdapter<City> = createEntityAdapter<City>();

export const initialState: CityState = adapter.getInitialState({
  // additional entity state properties
});

export const cityReducer = createReducer(
  initialState,
  on(CityActions.addCity,
    (state, action) => adapter.addOne(action.city, state)
  ),
  on(CityActions.upsertCity,
    (state, action) => adapter.upsertOne(action.city, state)
  ),
  on(CityActions.addCitys,
    (state, action) => adapter.addMany(action.citys, state)
  ),
  on(CityActions.upsertCitys,
    (state, action) => adapter.upsertMany(action.citys, state)
  ),
  on(CityActions.updateCity,
    (state, action) => adapter.updateOne(action.city, state)
  ),
  on(CityActions.updateCitys,
    (state, action) => adapter.updateMany(action.citys, state)
  ),
  on(CityActions.deleteCity,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CityActions.deleteCitys,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CityActions.loadCitys,
    (state, action) => adapter.setAll(action.citys, state)
  ),
  on(CityActions.clearCitys,
    state => adapter.removeAll(state)
  ),
);

export const citiesFeature = createFeature({
  name: citiesFeatureKey,
  reducer: cityReducer,
  extraSelectors: ({ selectCitiesState }) => ({
    ...adapter.getSelectors(selectCitiesState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = citiesFeature;
