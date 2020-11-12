import { EuiListGroupItemProps } from '@elastic/eui';

export interface MenuItem {
    title: string;
    route?: string | undefined;
    iconType?: string | undefined; // EUI Icon Type
    items?: MenuItem[] | undefined;
    parent?: MenuItem | undefined;
}

type AdminMenuItem = MenuItem & EuiListGroupItemProps;

export const adminConsoleMenuItems: AdminMenuItem[] = [
    {
        route: '/admin/announcements',
        title: 'Announcements', // required for MenuItem
        label: 'Announcements', // required for EuiListGroupItemProps
        iconType: 'cheer',
        size: 's',
        parent: {
            title: 'admin',
        },
    },
];

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
        route: '/tns',
        items: [
            {
                title: 'React Component Library',
                iconType: 'canvasApp',
                route: '/tns/componentLibrary',
            },
            {
                title: 'Micro Frontend',
                iconType: 'emsApp',
                route: '/tns/microFrontend',
            },
        ],
    },
];
