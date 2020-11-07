import { AppActionTypes, SET_SELECTED_MENU_ITEM } from './app-action.types';
import { MenuItem } from '../../components/AppSidebar/AppMenuItems';

// eslint-disable-next-line import/prefer-default-export
export const setSelectedMenuItem = (menuItem: MenuItem): AppActionTypes => ({
    type: SET_SELECTED_MENU_ITEM,
    payload: {
        menuItem,
    },
});
