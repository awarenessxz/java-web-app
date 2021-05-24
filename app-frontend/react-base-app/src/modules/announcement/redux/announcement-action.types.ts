import { AnnouncementEntity } from '../../../types/announcement-api.types';

/* ***************************************************************************************
 * Types Definition for other
 *************************************************************************************** */

// Redux State (App)
export interface AnnouncementStateType {
    showAnnouncement: boolean;
    announcements: AnnouncementEntity[];
}

/* ***************************************************************************************
 * List of all action type
 *************************************************************************************** */

export const SET_ACTIVE_ANNOUNCEMENTS = 'SET_ACTIVE_ANNOUNCEMENTS';
export const SET_SHOW_ANNOUNCEMENT = 'SET_SHOW_ANNOUNCEMENT';

/* ***************************************************************************************
 * Types Definition for all action type
 *************************************************************************************** */

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

// union action types
export type AnnouncementActionTypes = SetAnnouncementAction | SetShowAnnouncementAction;
