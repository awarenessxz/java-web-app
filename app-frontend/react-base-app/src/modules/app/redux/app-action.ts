import { AppActionTypes, INIT_BASE_APP, SET_IS_ADMIN_USER } from './app-action.types';
import { RootThunkResult } from '../../../redux/root-action';

/* ***************************************************************************************
 * Action Creators (Standard Redux Actions)
 *************************************************************************************** */

// Temporary only (To Be Removed...)
export const setIsAdminUserAction = (isAdminUser: boolean): AppActionTypes => ({
    type: SET_IS_ADMIN_USER,
    payload: {
        isAdminUser,
    },
});

/* ***************************************************************************************
 * Thunk Action (for supporting async/wait)
 *************************************************************************************** */

export const initBaseApplicationAction =
    (): RootThunkResult<void> =>
    (dispatch, getState): void => {
        // dispatch to set base app
        dispatch({
            type: INIT_BASE_APP,
            payload: {
                isAdminUser: true,
                isSiteReady: true,
            },
        });

        /*
        // fetch user details
        fetchBasic('/api/web/user/info', 'GET')
            .then((res) => res.json())
            .then((userInfo: UserInfo) => {
                // fetch announcements
                dispatch(initAnnouncementsAction());

                console.log(userInfo);

                // dispatch to set base app
                const isAdminUser = userInfo.userRole === UserRoles.admin;
                dispatch({
                    type: INIT_BASE_APP,
                    payload: {
                        isAdminUser,
                        isSiteReady: true,
                    },
                });
            })
            .catch((e) => {
                console.log(e);
            });
         */
    };
