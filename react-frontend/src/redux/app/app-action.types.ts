import { MenuItem, MenuItemMap } from '../../utils/routing/AppMenuItems';

/* ***************************************************************************************
 * List of all action type
 *************************************************************************************** */

export const SET_SELECTED_MENU_ITEM = 'SET_SELECTED_MENU_ITEM';
export const INIT_MENU_ITEMS = 'INIT_MENU_ITEMS';

/* ***************************************************************************************
 * Types Definition for all action type
 *************************************************************************************** */

interface SetSelectedMenuItemAction {
    type: typeof SET_SELECTED_MENU_ITEM;
    payload: {
        menuItem: MenuItem;
    };
}

interface InitMenuItemsAction {
    type: typeof INIT_MENU_ITEMS;
    payload: {
        selectedMenuItem: MenuItem;
        menuItemsMapping: MenuItemMap;
        isMenuLoaded: boolean;
    }
}

export type AppActionTypes = SetSelectedMenuItemAction | InitMenuItemsAction;

/* ***************************************************************************************
 * Types Definition for other
 *************************************************************************************** */

export interface AppActionStateTypes {
    selectedMenuItem: MenuItem | undefined;
    menuItemsMapping: MenuItemMap;
    isMenuLoaded: boolean;
}
