import { Reducer } from 'react';
import {
    AppStateTypes,
    AppActionTypes,
    INIT_BASE_APP,
    SET_IS_ADMIN_USER,
    SET_SELECTED_MENU_ITEM,
    SET_SHOW_ANNOUNCEMENT,
} from './app-action.types';

const initialState: AppStateTypes = {
    isAdminUser: false,
    showAnnouncement: false,
    selectedMenuItem: undefined,
    menuItemsMapping: {},
    isSiteReady: false,
};

const appReducer: Reducer<AppStateTypes, AppActionTypes> = (
    state: AppStateTypes = initialState,
    action: AppActionTypes,
): AppStateTypes => {
    switch (action.type) {
        case SET_IS_ADMIN_USER:
            return {
                ...state,
                isAdminUser: action.payload.isAdminUser,
            };
        case SET_SHOW_ANNOUNCEMENT:
            return {
                ...state,
                showAnnouncement: action.payload.showAnnouncement,
            };
        case SET_SELECTED_MENU_ITEM:
            return {
                ...state,
                selectedMenuItem: action.payload.menuItem,
            };
        case INIT_BASE_APP:
            return {
                ...state,
                selectedMenuItem: action.payload.selectedMenuItem,
                menuItemsMapping: action.payload.menuItemsMapping,
                showAnnouncement: action.payload.showAnnouncement,
                isAdminUser: action.payload.isAdminUser,
                isSiteReady: action.payload.isSiteReady,
            };
        default:
            return state;
    }
};

export default appReducer;
