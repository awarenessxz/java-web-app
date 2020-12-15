import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './root-reducer';
import { AppActionTypes } from './app/app-action.types';

// Will have to collate all Action Types Manually (temporary fix for now, until there is a "correct" way to do this
export type RootActionType = AppActionTypes;

export type RootThunkResult<R> = ThunkAction<R, RootState, undefined, Action>;
