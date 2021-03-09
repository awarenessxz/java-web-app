/*
 * Sidebar Menu Configuration
 */
import { EuiListGroupItemProps } from '@elastic/eui';

export interface MenuItem {
    title: string;
    route?: string | undefined;
    iconType?: string | undefined; // EUI Icon Type
    items?: MenuItem[] | undefined;
}

type EuiListMenuItem = MenuItem & EuiListGroupItemProps;

export const sidebarAdminMenuItems: EuiListMenuItem[] = [
    {
        route: '/admin/announcements',
        title: 'Announcement Console', // required for MenuItem
        label: 'Announcement Console', // required for EuiListGroupItemProps
        iconType: 'cheer',
        size: 's',
    },
];

export const sidebarMenuItems: MenuItem[] = [
    {
        title: 'Search',
        iconType: 'searchProfilerApp',
        route: '/search',
        items: [
            {
                title: 'Search Templates',
                iconType: 'list',
                route: '/search/templates',
                items: [
                    {
                        title: 'Default',
                        iconType: 'list',
                        items: [
                            {
                                title: 'Template A',
                                iconType: 'search',
                                route: '/search/templates/templateA',
                            },
                            {
                                title: 'Template B',
                                iconType: 'search',
                                route: '/search/templates/templateB',
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
                route: '/search/results',
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
