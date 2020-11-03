import { AppActionTypes, SET_SELECTED_MENU_ITEM } from './app-action.types';

// eslint-disable-next-line import/prefer-default-export
export const setSelectedMenuItem = (menuItem: string): AppActionTypes => ({
    type: SET_SELECTED_MENU_ITEM,
    payload: {
        menuItem,
    },
});
