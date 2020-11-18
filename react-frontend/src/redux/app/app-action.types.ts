import { MenuItem } from '../../utils/routing/app-menu-item';
import { MenuItemMap } from '../../utils/routing/navigation-utils';

/* ***************************************************************************************
 * Types Definition for other
 *************************************************************************************** */

// Redux State (App)
export interface AppStateTypes {
    // Access Control
    isAdminUser: boolean;
    // Announcements
    showAnnouncement: boolean;
    // Side Bar Menu Item
    selectedMenuItem: MenuItem | undefined;
    menuItemsMapping: MenuItemMap;
    isSiteReady: boolean;
}

/* ***************************************************************************************
 * List of all action type
 *************************************************************************************** */

export const SET_IS_ADMIN_USER = 'SET_IS_ADMIN_USER';
export const SET_SHOW_ANNOUNCEMENT = 'SET_SHOW_ANNOUNCEMENT';
export const SET_SELECTED_MENU_ITEM = 'SET_SELECTED_MENU_ITEM';
export const INIT_BASE_APP = 'INIT_BASE_APP';

/* ***************************************************************************************
 * Types Definition for all action type
 *************************************************************************************** */

interface SetIsAdminUserAction {
    type: typeof SET_IS_ADMIN_USER;
    payload: {
        isAdminUser: boolean;
    };
}

interface SetShowAnnouncementAction {
    type: typeof SET_SHOW_ANNOUNCEMENT;
    payload: {
        showAnnouncement: boolean;
    };
}

interface SetSelectedMenuItemAction {
    type: typeof SET_SELECTED_MENU_ITEM;
    payload: {
        menuItem: MenuItem | undefined;
    };
}

interface InitBaseAppAction {
    type: typeof INIT_BASE_APP;
    payload: {
        selectedMenuItem: MenuItem;
        menuItemsMapping: MenuItemMap;
        showAnnouncement: boolean;
        isAdminUser: boolean;
        isSiteReady: boolean;
    };
}

// union action types
export type AppActionTypes =
    | SetIsAdminUserAction
    | SetShowAnnouncementAction
    | SetSelectedMenuItemAction
    | InitBaseAppAction;
