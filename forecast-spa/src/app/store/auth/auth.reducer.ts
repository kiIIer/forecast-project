import { createReducer, on } from '@ngrx/store';
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

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginComplete, (state, { user, isLoggedIn, isAdmin }) => ({
    ...state,
    userProfile: user,
    isLoggedIn,
    isAdmin
  })),
  on(AuthActions.logoutComplete, (state) => ({ ...state, userProfile: null, isLoggedIn: false, isAdmin: false }))
);

