import { adminConsoleMenuItems, defaultMenuItems, generalMenuItems, MenuItem } from './app-menu-item';

export interface MenuItemMap {
    [route: string]: MenuItem; // ['route'] = MenuItem;
}

/* ***************************************************************************************
 * Menu Item Utility Functions
 *************************************************************************************** */

// creates menu Item recursively
const createMenuItemMappingRecursively = (menuItemMapping: MenuItemMap, menuItem: MenuItem): void => {
    if (menuItem.route !== undefined) {
        // eslint-disable-next-line no-param-reassign
        menuItemMapping[menuItem.route] = menuItem;
    }
    menuItem.items?.forEach((item) => createMenuItemMappingRecursively(menuItemMapping, item));
};

// initialize menu Item Mapping for easy reference
export const generateMenuItemMapping = (): MenuItemMap => {
    const menuItemMapping: MenuItemMap = {};
    defaultMenuItems.forEach((item) => createMenuItemMappingRecursively(menuItemMapping, item));
    adminConsoleMenuItems.forEach((item) => createMenuItemMappingRecursively(menuItemMapping, item));
    generalMenuItems.forEach((item) => createMenuItemMappingRecursively(menuItemMapping, item));
    return menuItemMapping;
};

/* ***************************************************************************************
 * Routing Related Utility Functions
 *************************************************************************************** */

// get current url route
export const getCurrentRoute = (): string => {
    const route = window.location.hash.replace(/#/, '');
    if (route === '') {
        return '/'; // "website.com/#/" ---> this will give empty string
    }
    return route;
};

// get broker url -- https://github.com/stomp-js/ng2-stompjs/issues/129
export const getBrokerUrl = (path: string): string => {
    // eg. http://localhost:8080/
    const currentPath = `${window.location.origin + window.location.pathname}`;
    const url = new URL(path, currentPath);
    // convert protocol http -> ws and https -> wss
    url.protocol = url.protocol.replace('http', 'ws');
    return url.href;
};
