import { ThunkAction } from 'redux-thunk';
import { RootState } from './root-reducer';
import { AppActionTypes } from './app/app-action.types';

type RootActionTypes = AppActionTypes;

export type RootThunkResult<R> = ThunkAction<R, RootState, undefined, RootActionTypes>;
