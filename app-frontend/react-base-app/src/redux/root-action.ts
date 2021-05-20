import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './root-reducer';
import { AppActionTypes } from '../modules/app/redux/app-action.types';
import { AnnouncementActionTypes } from '../modules/announcement/redux/announcement-action.types';

// Will have to collate all Action Types Manually (temporary fix for now, until there is a "correct" way to do this
export type RootActionType = AppActionTypes | AnnouncementActionTypes;

export type RootThunkResult<R> = ThunkAction<R, RootState, undefined, Action>;
