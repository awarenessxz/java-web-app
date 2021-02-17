import { AnnouncementActionTypes, SET_ACTIVE_ANNOUNCEMENTS, SET_SHOW_ANNOUNCEMENT } from './announcement-action.types';
import { AnnouncementEntity } from '../api/announcement-api.types';
import { RootThunkResult } from '../../../redux/root-action';
import { fetchBasic } from '../../common/utils/fetch-util';

/* ***************************************************************************************
 * Action Creators (Standard Redux Actions)
 *************************************************************************************** */

export const setShowAnnouncement = (showAnnouncement: boolean): AnnouncementActionTypes => ({
    type: SET_SHOW_ANNOUNCEMENT,
    payload: {
        showAnnouncement,
    },
});

/* ***************************************************************************************
 * Thunk Action (for supporting async/wait)
 *************************************************************************************** */

export const receiveNewAnnouncement = (announcement: AnnouncementEntity): RootThunkResult<void> => (
    dispatch,
    getState,
): void => {
    const announcements = [...getState().announcement.announcements, announcement];
    dispatch({
        type: SET_ACTIVE_ANNOUNCEMENTS,
        payload: {
            announcements,
            showAnnouncement: true,
        },
    });
};

export const initAnnouncements = (): RootThunkResult<void> => (dispatch, getState): void => {
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
