import { combineReducers } from 'redux';
import appReducer from '../modules/app/redux/app-reducer';
import announcementReducer from '../modules/announcement/redux/announcement-reducer';

// root reducer for redux
export const rootReducer = combineReducers({
    app: appReducer,
    announcement: announcementReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
