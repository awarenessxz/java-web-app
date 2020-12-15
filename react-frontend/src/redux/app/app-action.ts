import {
    AppActionTypes,
    INIT_BASE_APP,
    SET_ACTIVE_ANNOUNCEMENTS,
    SET_IS_ADMIN_USER,
    SET_SELECTED_MENU_ITEM,
    SET_SHOW_ANNOUNCEMENT,
} from './app-action.types';
import { RootThunkResult } from '../root-action';
import { MenuItem } from '../../utils/routing/app-menu-item';
import { generateMenuItemMapping, getCurrentRoute } from '../../utils/routing/navigation-utils';
import { checkUserAccess } from '../../utils/access-control';
import { fetchBasic } from '../../utils/fetch-util';

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

/* ***************************************************************************************
 * Thunk Action (for supporting async/wait)
 *************************************************************************************** */

const initAnnouncements = (): RootThunkResult<void> => (dispatch, getState): void => {
    fetchBasic('/api/announcements/latest', 'GET')
        .then((res) => res.json())
        .then((data) => {
            if (Array.isArray(data)) {
                dispatch({
                    type: SET_ACTIVE_ANNOUNCEMENTS,
                    payload: {
                        announcements: data,
                        showAnnouncement: data.length > 0,
                    },
                });
            } else {
                console.log('announcement fetch error!');
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

export const initBaseApplication = (): RootThunkResult<void> => (dispatch, getState): void => {
    // initialize menu items
    const menuItemMapping = generateMenuItemMapping();
    const selectedMenuItem = menuItemMapping[getCurrentRoute()];

    // verify user details (temporary)
    // fetch user details
    const userDetails = { userId: 'user123' };
    const isAdminUser = checkUserAccess(userDetails.userId);

    // fetch announcements
    dispatch(initAnnouncements());

    // dispatch to set base app
    dispatch({
        type: INIT_BASE_APP,
        payload: {
            selectedMenuItem,
            menuItemMapping,
            isAdminUser,
            isSiteReady: true,
        },
    });
};
