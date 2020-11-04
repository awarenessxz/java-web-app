import { AppActionStateTypes, AppActionTypes, SET_SELECTED_MENU_ITEM } from './app-action.types';

const initialState: AppActionStateTypes = {
    selectedMenuItem: '',
};

const appReducer = (state: AppActionStateTypes = initialState, action: AppActionTypes): AppActionStateTypes => {
    switch (action.type) {
        case SET_SELECTED_MENU_ITEM:
            return {
                ...state,
                selectedMenuItem: action.payload.menuItem,
            };
        default:
            return state;
    }
};

export default appReducer;
