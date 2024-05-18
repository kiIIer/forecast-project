import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  userProfile: any;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export const initialState: AuthState = {
  userProfile: null,
  isLoggedIn: false,
  isAdmin: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginComplete, (state, { user, isLoggedIn, isAdmin }) => ({
    ...state,
    userProfile: user,
    isLoggedIn,
    isAdmin
  })),
  on(AuthActions.logoutComplete, (state) => ({ ...state, userProfile: null, isLoggedIn: false, isAdmin: false }))
);

const authSelector = createFeatureSelector<AuthState>(authFeatureKey);

export const selectUserProfile = createSelector(authSelector, state => state.userProfile);
export const selectIsLoggedIn = createSelector(authSelector, state => state.isLoggedIn);
export const selectIsAdmin = createSelector(authSelector, state => state.isAdmin);
