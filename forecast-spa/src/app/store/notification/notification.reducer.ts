import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Notification } from './notification.model';
import { NotificationActions } from './notification.actions';

export const notificationsFeatureKey = 'notifications';

export interface NotificationState extends EntityState<Notification> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Notification> = createEntityAdapter<Notification>();

export const initialState: NotificationState = adapter.getInitialState({
  // additional entity state properties
});

export const notificationReducer = createReducer(
  initialState,
  on(NotificationActions.addNotification,
    (state, action) => adapter.addOne(action.notification, state)
  ),
  on(NotificationActions.upsertNotification,
    (state, action) => adapter.upsertOne(action.notification, state)
  ),
  on(NotificationActions.addNotifications,
    (state, action) => adapter.addMany(action.notifications, state)
  ),
  on(NotificationActions.upsertNotifications,
    (state, action) => adapter.upsertMany(action.notifications, state)
  ),
  on(NotificationActions.updateNotification,
    (state, action) => adapter.updateOne(action.notification, state)
  ),
  on(NotificationActions.updateNotifications,
    (state, action) => adapter.updateMany(action.notifications, state)
  ),
  on(NotificationActions.deleteNotification,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(NotificationActions.deleteNotifications,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(NotificationActions.loadNotifications,
    (state, action) => adapter.setAll(action.notifications, state)
  ),
  on(NotificationActions.clearNotifications,
    state => adapter.removeAll(state)
  ),
);

export const notificationsFeature = createFeature({
  name: notificationsFeatureKey,
  reducer: notificationReducer,
  extraSelectors: ({ selectNotificationsState }) => ({
    ...adapter.getSelectors(selectNotificationsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = notificationsFeature;
