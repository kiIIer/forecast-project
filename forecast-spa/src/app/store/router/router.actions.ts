import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Notification } from '../notification/notification.model';
import { Update } from '@ngrx/entity';

export const RouterActions = createActionGroup({
  source: 'Router/API',
  events: {
    'Navigate By Url': props<{ url: string }>()
  }
});
