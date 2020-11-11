import {
    AppActionStateTypes,
    AppActionTypes,
    INIT_MENU_ITEMS,
    SET_SELECTED_MENU_ITEM
} from './app-action.types';

const initialState: AppActionStateTypes = {
    selectedMenuItem: undefined,
    menuItemsMapping: {},
    isMenuLoaded: false,
};

const appReducer = (state: AppActionStateTypes = initialState, action: AppActionTypes): AppActionStateTypes => {
    switch (action.type) {
        case SET_SELECTED_MENU_ITEM:
            return {
                ...state,
                selectedMenuItem: action.payload.menuItem,
            };
        case INIT_MENU_ITEMS:
            return {
                selectedMenuItem: action.payload.selectedMenuItem,
                menuItemsMapping: action.payload.menuItemsMapping,
                isMenuLoaded: action.payload.isMenuLoaded,
            };
        default:
            return state;
    }
};

export default appReducer;
