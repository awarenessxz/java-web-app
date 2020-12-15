import { MenuItem } from '../../utils/routing/app-menu-item';
import { MenuItemMap } from '../../utils/routing/navigation-utils';
import { AnnouncementEntity } from '../../types/api/announcement-api.types';

/* ***************************************************************************************
 * Types Definition for other
 *************************************************************************************** */

// Redux State (App)
export interface AppStateTypes {
    // Access Control
    isAdminUser: boolean;
    // Announcements
    showAnnouncement: boolean;
    announcements: AnnouncementEntity[];
    // Side Bar Menu Item
    selectedMenuItem: MenuItem | undefined;
    menuItemsMapping: MenuItemMap;
    isSiteReady: boolean;
}

/* ***************************************************************************************
 * List of all action type
 *************************************************************************************** */

export const SET_IS_ADMIN_USER = 'SET_IS_ADMIN_USER';
export const SET_ACTIVE_ANNOUNCEMENTS = 'SET_ACTIVE_ANNOUNCEMENTS';
export const SET_SHOW_ANNOUNCEMENT = 'SET_SHOW_ANNOUNCEMENT';
export const SET_SELECTED_MENU_ITEM = 'SET_SELECTED_MENU_ITEM';
export const INIT_BASE_APP = 'INIT_BASE_APP';

/* ***************************************************************************************
 * Types Definition for all action type
 *************************************************************************************** */

// temporary -- to be removed
interface SetIsAdminUserAction {
    type: typeof SET_IS_ADMIN_USER;
    payload: {
        isAdminUser: boolean;
    };
}

// temporary -- to be removed
interface SetShowAnnouncementAction {
    type: typeof SET_SHOW_ANNOUNCEMENT;
    payload: {
        showAnnouncement: boolean;
    };
}

interface SetAnnouncementAction {
    type: typeof SET_ACTIVE_ANNOUNCEMENTS;
    payload: {
        showAnnouncement: boolean;
        announcements: AnnouncementEntity[];
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
        isAdminUser: boolean;
        isSiteReady: boolean;
    };
}

// union action types
export type AppActionTypes =
    | SetIsAdminUserAction
    | SetAnnouncementAction
    | SetShowAnnouncementAction
    | SetSelectedMenuItemAction
    | InitBaseAppAction;
