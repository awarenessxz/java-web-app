import { MenuItem } from './AppSideBar.types';

// eslint-disable-next-line import/prefer-default-export
export const defaultMenuItems: MenuItem[] = [
    {
        title: 'Search',
        iconType: 'logoKibana',
        isCollapsible: false,
        isOpen: true,
        route: '/',
    },
    {
        title: 'Template',
        iconType: 'home',
        isCollapsible: true,
        isOpen: true,
        route: '/template',
        items: [
            {
                title: 'Template A',
                iconType: 'home',
                isCollapsible: true,
                isOpen: true,
                route: '/templateA',
            },
            {
                title: 'Template B',
                iconType: 'home',
                isCollapsible: true,
                isOpen: true,
                route: '/templateB',
            },
            {
                title: 'Template C',
                iconType: 'home',
                isCollapsible: true,
                isOpen: true,
                route: '/templateC',
            },
        ],
    },
];
