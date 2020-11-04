import { MenuItem } from './AppSideBar.types';

// eslint-disable-next-line import/prefer-default-export
export const defaultMenuItems: MenuItem[] = [
    {
        title: 'Search',
        iconType: 'logoKibana',
        route: '/',
    },
    {
        title: 'Template',
        iconType: 'logoAWS',
        route: '/template',
        items: [
            {
                title: 'Template A',
                iconType: 'home',
                route: '/templateA',
            },
            {
                title: 'Template B',
                iconType: 'home',
                route: '/templateB',
                items: [
                    {
                        title: 'Template D',
                        iconType: 'home',
                        route: '/templateA',
                    },
                    {
                        title: 'Template E',
                        iconType: 'home',
                        route: '/templateB',
                    },
                    {
                        title: 'Template F',
                        iconType: 'home',
                        route: '/templateC',
                    },
                ],
            },
            {
                title: 'Template C',
                iconType: 'home',
                route: '/templateC',
            },
        ],
    },
];
