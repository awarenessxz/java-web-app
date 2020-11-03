import { combineReducers } from 'redux';
import appReducer from './app/app-reducer';
import { AppActionStateTypes } from './app/app-action.types';

export interface RootState {
    app: AppActionStateTypes;
}

// root reducer for redux
export const rootReducer = combineReducers<RootState>({
    app: appReducer,
});
