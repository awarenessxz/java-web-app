import { combineReducers } from 'redux';
import appReducer from './app/app-reducer';

// root reducer for redux
export const rootReducer = combineReducers({
    app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
