import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Notification } from './notification.model';

export const NotificationActions = createActionGroup({
  source: 'Notification/API',
  events: {
    'Load Notifications': props<{ notifications: Notification[] }>(),
    'Add Notification': props<{ notification: Notification }>(),
    'Upsert Notification': props<{ notification: Notification }>(),
    'Add Notifications': props<{ notifications: Notification[] }>(),
    'Upsert Notifications': props<{ notifications: Notification[] }>(),
    'Update Notification': props<{ notification: Update<Notification> }>(),
    'Update Notifications': props<{ notifications: Update<Notification>[] }>(),
    'Delete Notification': props<{ id: string }>(),
    'Delete Notifications': props<{ ids: string[] }>(),
    'Clear Notifications': emptyProps(),
  }
});
