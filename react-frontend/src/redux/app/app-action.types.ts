/* ***************************************************************************************
 * List of all action type
 *************************************************************************************** */
export const SET_SELECTED_MENU_ITEM = 'SET_SELECTED_MENU_ITEM';

/* ***************************************************************************************
 * Types Definition for all action type
 *************************************************************************************** */

interface SetSelectedMenuItemAction {
    type: typeof SET_SELECTED_MENU_ITEM;
    payload: {
        menuItem: string;
    };
}

export type AppActionTypes = SetSelectedMenuItemAction;

/* ***************************************************************************************
 * Types Definition for other
 *************************************************************************************** */

export interface AppActionStateTypes {
    selectedMenuItem: string;
}
