/*
 * Utility file for dealing with url navigations
 */
import { sidebarAdminMenuItems, sidebarMenuItems, MenuItem } from './app-menu-item-config';
import { AppRoutesMap, routes } from './app-routes';
import { stringify } from 'querystring';

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

// split route by /
export const getRoutePaths = (route: string): string[] => {
    if (route.startsWith('/')) {
        return route.substring(1).split('/');
    }
    return route.split('/');
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

// convert array to map
export const convertRoutesArrToMap = (): AppRoutesMap => {
    return routes.reduce((acc, obj) => {
        const map = { ...acc };
        if (typeof obj.path === 'string') {
            map[obj.path] = obj;
        }
        return map;
    }, {} as AppRoutesMap);
};

/* ***************************************************************************************
 * Menu Item Utility Functions
 *************************************************************************************** */

export interface MenuItemMap {
    [route: string]: MenuItem; // ['route'] = MenuItem;
}

interface InitMenuItemsResults {
    menuItemsMapping: MenuItemMap;
    selectedMenuItem: MenuItem;
}

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
    sidebarMenuItems.forEach((item) => createMenuItemMappingRecursively(menuItemMapping, item));
    sidebarAdminMenuItems.forEach((item) => createMenuItemMappingRecursively(menuItemMapping, item));
    return menuItemMapping;
};

// initialize menu items
export const initMenuItems = (): InitMenuItemsResults => {
    const menuItemsMapping = generateMenuItemMapping();
    const selectedMenuItem = menuItemsMapping[getCurrentRoute()];
    return { menuItemsMapping, selectedMenuItem };
};
