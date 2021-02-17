import { AppActionTypes, INIT_BASE_APP, SET_IS_ADMIN_USER, SET_SELECTED_MENU_ITEM } from './app-action.types';
import { RootThunkResult } from '../../../redux/root-action';
import { initAnnouncements } from '../../announcement/redux/announcement-action';
import { MenuItem } from '../../common/utils/routing/app-menu-item-config';
import { generateMenuItemMapping, getCurrentRoute } from '../../common/utils/routing/navigation-utils';
import { fetchBasic } from '../../common/utils/fetch-util';
import { UserInfo, UserRoles } from '../api/userinfo-api.types';

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

export const setSelectedMenuItem = (menuItem: MenuItem | undefined): AppActionTypes => ({
    type: SET_SELECTED_MENU_ITEM,
    payload: {
        menuItem,
    },
});

/* ***************************************************************************************
 * Thunk Action (for supporting async/wait)
 *************************************************************************************** */

export const initBaseApplication = (): RootThunkResult<void> => (dispatch, getState): void => {
    // initialize menu items
    const menuItemsMapping = generateMenuItemMapping();
    const selectedMenuItem = menuItemsMapping[getCurrentRoute()];

    // fetch user details
    fetchBasic('/api/web/user/info', 'GET')
        .then((res) => res.json())
        .then((userInfo: UserInfo) => {
            // fetch announcements
            dispatch(initAnnouncements());

            console.log(userInfo);

            // dispatch to set base app
            const isAdminUser = userInfo.userRole === UserRoles.admin;
            dispatch({
                type: INIT_BASE_APP,
                payload: {
                    selectedMenuItem,
                    menuItemsMapping,
                    isAdminUser,
                    isSiteReady: true,
                },
            });
        })
        .catch((e) => {
            console.log(e);
        });
};
