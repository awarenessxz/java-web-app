import {
    AppActionTypes,
    AppThunkResult,
    INIT_BASE_APP,
    SET_IS_ADMIN_USER,
    SET_SELECTED_MENU_ITEM,
    SET_SHOW_ANNOUNCEMENT,
} from './app-action.types';
import { MenuItem } from '../../utils/routing/app-menu-item';
import { generateMenuItemMapping, getCurrentRoute, MenuItemMap } from '../../utils/routing/navigation-utils';
import { checkUserAccess } from '../../utils/app/access-control';

/* ***************************************************************************************
 * Action Creators (Standard Redux Actions)
 *************************************************************************************** */

// Temporary only (To Be Removed...)
export const setIsAdminUser = (isAdminUser: boolean): AppActionTypes => ({
    type: SET_IS_ADMIN_USER,
    payload: {
        isAdminUser,
    },
});

// Temporary only (To Be Removed...)
export const setShowAnnouncement = (showAnnouncement: boolean): AppActionTypes => ({
    type: SET_SHOW_ANNOUNCEMENT,
    payload: {
        showAnnouncement,
    },
});

export const setSelectedMenuItem = (menuItem: MenuItem | undefined): AppActionTypes => ({
    type: SET_SELECTED_MENU_ITEM,
    payload: {
        menuItem,
    },
});

const initBaseApp = (
    menuItemsMapping: MenuItemMap,
    selectedMenuItem: MenuItem,
    isAdminUser: boolean,
    showAnnouncement: boolean,
): AppActionTypes => ({
    type: INIT_BASE_APP,
    payload: {
        selectedMenuItem,
        menuItemsMapping,
        isAdminUser,
        showAnnouncement,
        isSiteReady: true,
    },
});

/* ***************************************************************************************
 * Thunk Action (for supporting async/wait)
 *************************************************************************************** */

export const initBaseApplication = (): AppThunkResult<void> => {
    // initialize menu items
    const menuItemMapping = generateMenuItemMapping();
    const selectedMenuItem = menuItemMapping[getCurrentRoute()];

    // verify user details (temporary)
    // fetch user details
    const userDetails = { userId: 'user123' };
    const isAdminUser = checkUserAccess(userDetails.userId);

    // fetch announcement (temporary)
    const showAnnouncement = false;

    return (dispatch, getState): void => {
        dispatch(initBaseApp(menuItemMapping, selectedMenuItem, isAdminUser, showAnnouncement));
    };
};
