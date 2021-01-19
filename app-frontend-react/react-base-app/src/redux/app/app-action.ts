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
import { fetchBasic } from '../../utils/fetch-util';
import { AnnouncementEntity } from '../../api/announcement-api.types'
import { UserInfo, UserRoles } from '../../api/userinfo-api.types';

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

export const receiveNewAnnouncement = (announcement: AnnouncementEntity): RootThunkResult<void> => (
    dispatch,
    getState,
): void => {
    const announcements = [...getState().app.announcements, announcement];
    dispatch({
        type: SET_ACTIVE_ANNOUNCEMENTS,
        payload: {
            announcements,
            showAnnouncement: true,
        },
    });
};

const initAnnouncements = (): RootThunkResult<void> => (dispatch, getState): void => {
    fetchBasic('/api/web/announcements/latest', 'GET')
        .then((res) => res.json())
        .then((data) => {
            if (Array.isArray(data)) {
                const readAnnouncementIds = localStorage.getItem('readAnnouncementIds');
                let readAnnouncementsCount = 0;
                if (readAnnouncementIds) {
                    const readAnnouncementIdsArr: string[] = JSON.parse(readAnnouncementIds) as string[];
                    const newReadAnnouncementIdsArr = data
                        .filter((announcement: AnnouncementEntity) => {
                            return announcement.id && readAnnouncementIdsArr.includes(announcement.id);
                        })
                        .map((filteredAnnouncement: AnnouncementEntity) => {
                            return filteredAnnouncement.id;
                        });
                    localStorage.setItem('readAnnouncementIds', JSON.stringify(newReadAnnouncementIdsArr));
                    readAnnouncementsCount = newReadAnnouncementIdsArr.length;
                }
                dispatch({
                    type: SET_ACTIVE_ANNOUNCEMENTS,
                    payload: {
                        announcements: data,
                        showAnnouncement: data.length - readAnnouncementsCount > 0,
                    },
                });
            } else {
                console.log('announcement fetch error!');
            }
        })
        .catch((err) => {
            console.log('announcement fetch error!');
        });
};

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
