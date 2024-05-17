import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'CheckAuth': emptyProps(),
    'Login': emptyProps(),
    'Login complete': props<{ user: any, isLoggedIn: boolean, isAdmin: boolean }>(),
    'Logout': emptyProps(),
    'Logout complete': emptyProps()
  }
});
