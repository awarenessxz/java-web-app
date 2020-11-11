import {
    AppActionTypes,
    INIT_MENU_ITEMS,
    SET_SELECTED_MENU_ITEM
} from './app-action.types';
import { MenuItem, MenuItemMap } from '../../utils/routing/AppMenuItems';

export const setSelectedMenuItem = (menuItem: MenuItem): AppActionTypes => ({
    type: SET_SELECTED_MENU_ITEM,
    payload: {
        menuItem,
    },
});

export const initMenuItems = (menuItemsMapping: MenuItemMap, selectedMenuItem: MenuItem): AppActionTypes => ({
        type: INIT_MENU_ITEMS,
        payload: {
            selectedMenuItem,
            menuItemsMapping,
            isMenuLoaded: true,
        },
});
