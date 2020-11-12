import {
    AppActionStateTypes,
    AppActionTypes,
    INIT_BASE_APP,
    SET_IS_ADMIN_USER,
    SET_SELECTED_MENU_ITEM,
} from './app-action.types';

const initialState: AppActionStateTypes = {
    isAdminUser: false,
    selectedMenuItem: undefined,
    menuItemsMapping: {},
    isSiteReady: false,
};

const appReducer = (state: AppActionStateTypes = initialState, action: AppActionTypes): AppActionStateTypes => {
    switch (action.type) {
        case SET_IS_ADMIN_USER:
            return {
                ...state,
                isAdminUser: action.payload.isAdminUser,
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
                isAdminUser: action.payload.isAdminUser,
                isSiteReady: action.payload.isSiteReady,
            };
        default:
            return state;
    }
};

export default appReducer;
