import { AppActionTypes, AppStateType, INIT_BASE_APP, SET_IS_ADMIN_USER } from './app-action.types';

const initialState: AppStateType = {
    isAdminUser: false,
    isSiteReady: false,
};

const appReducer = (state: AppStateType = initialState, action: AppActionTypes): AppStateType => {
    switch (action.type) {
        case SET_IS_ADMIN_USER:
            return {
                ...state,
                isAdminUser: action.payload.isAdminUser,
            };
        case INIT_BASE_APP:
            return {
                ...state,
                isAdminUser: action.payload.isAdminUser,
                isSiteReady: action.payload.isSiteReady,
            };
        default:
            return state;
    }
};

export default appReducer;
