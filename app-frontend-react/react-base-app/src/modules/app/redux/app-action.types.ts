/* ***************************************************************************************
 * Types Definition for other
 *************************************************************************************** */

// Redux State (App)
export interface AppStateType {
    isAdminUser: boolean; // Access Control
    isSiteReady: boolean;
}

/* ***************************************************************************************
 * List of all action type
 *************************************************************************************** */

export const SET_IS_ADMIN_USER = 'SET_IS_ADMIN_USER';
export const INIT_BASE_APP = 'INIT_BASE_APP';

/* ***************************************************************************************
 * Types Definition for all action type
 *************************************************************************************** */

// temporary -- to be removed
interface SetIsAdminUser {
    type: typeof SET_IS_ADMIN_USER;
    payload: {
        isAdminUser: boolean;
    };
}

interface InitBaseApp {
    type: typeof INIT_BASE_APP;
    payload: {
        isAdminUser: boolean;
        isSiteReady: boolean;
    };
}

// union action types
export type AppActionTypes = SetIsAdminUser | InitBaseApp;
