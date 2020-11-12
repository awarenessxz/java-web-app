import { defaultMenuItems, NavMenuItem } from './app-nav-menu';
import { adminConsoleMenuItems, AdminMenuItem } from './app-admin-menu';

export type MenuItem = NavMenuItem | AdminMenuItem;

export interface MenuItemMap {
    [route: string]: MenuItem; // ['route'] = NavMenuItem | AdminMenuItem;
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
    // MenuItems have sub Items [Additional processing required]
    if ('items' in menuItem) {
        menuItem.items?.forEach((item) => createMenuItemMappingRecursively(menuItemMapping, item));
    }
};

// initialize menu Item Mapping for easy reference
export const generateMenuItemMapping = (): MenuItemMap => {
    const menuItemMapping: MenuItemMap = {};
    defaultMenuItems.forEach((item) => createMenuItemMappingRecursively(menuItemMapping, item));
    adminConsoleMenuItems.forEach((item) => createMenuItemMappingRecursively(menuItemMapping, item));
    return menuItemMapping;
};

/* ***************************************************************************************
 * Routing Related Utility Functions
 *************************************************************************************** */

// eslint-disable-next-line import/prefer-default-export
export const getCurrentRoute = (): string => {
    const route = window.location.hash.replace(/#/, '');
    if (route === '') {
        return '/'; // "website.com/#/" ---> this will give empty string
    }
    return route;
};
