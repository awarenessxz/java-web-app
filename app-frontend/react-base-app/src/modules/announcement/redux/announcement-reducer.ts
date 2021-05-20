import {
    SET_SHOW_ANNOUNCEMENT,
    SET_ACTIVE_ANNOUNCEMENTS,
    AnnouncementStateType,
    AnnouncementActionTypes,
} from './announcement-action.types';

const initialState: AnnouncementStateType = {
    showAnnouncement: false,
    announcements: [],
};

const announcementReducer = (
    state: AnnouncementStateType = initialState,
    action: AnnouncementActionTypes,
): AnnouncementStateType => {
    switch (action.type) {
        case SET_ACTIVE_ANNOUNCEMENTS:
            return {
                ...state,
                announcements: [...action.payload.announcements],
                showAnnouncement: action.payload.showAnnouncement,
            };
        case SET_SHOW_ANNOUNCEMENT:
            return {
                ...state,
                showAnnouncement: action.payload.showAnnouncement,
            };
        default:
            return state;
    }
};

export default announcementReducer;
