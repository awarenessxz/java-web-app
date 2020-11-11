export interface MenuItem {
    title: string;
    route?: string | undefined;
    iconType?: string | undefined; // EUI Icon Type
    items?: MenuItem[] | undefined;
    parent?: MenuItem | undefined;
}

export interface MenuItemMap {
    [route: string]: MenuItem; // ['route'] = MenuItem
}

export const defaultMenuItems: MenuItem[] = [
    {
        title: 'Search',
        iconType: 'searchProfilerApp',
        route: '/',
        items: [
            {
                title: 'Search Templates',
                iconType: 'list',
                route: '/templates',
                items: [
                    {
                        title: 'Default',
                        iconType: 'list',
                        items: [
                            {
                                title: 'Template A',
                                iconType: 'search',
                                route: '/templates/templateA',
                            },
                            {
                                title: 'Template B',
                                iconType: 'search',
                                route: '/templates/templateB',
                            },
                        ],
                    },
                    {
                        title: 'Personal',
                        iconType: 'list',
                    },
                    {
                        title: 'Shared',
                        iconType: 'list',
                    },
                ],
            },
            {
                title: 'Search Results',
                iconType: 'reportingApp',
                route: '/searchResults',
            },
        ],
    },
    {
        title: 'Tools & Services',
        iconType: 'spacesApp',
        route: '/toolsAndServices',
    },
];

// creates menu Item recursively
const createMenuItemMappingRecursively = (menuItemMapping: MenuItemMap, menuItem: MenuItem) => {
    if (menuItem.route !== undefined) {
        menuItemMapping[menuItem.route] = menuItem;
    }
    menuItem.items?.forEach((item) => createMenuItemMappingRecursively(menuItemMapping, item));
};

// initialize menu Item Mapping for easy reference
export const generateMenuItemMapping = (): MenuItemMap => {
    const menuItemMapping: MenuItemMap = {};
    defaultMenuItems.forEach((item) => createMenuItemMappingRecursively(menuItemMapping, item));
    return menuItemMapping;
};
