export interface MenuItem {
    title: string;
    route?: string | undefined;
    iconType?: string | undefined; // EUI Icon Type
    items?: MenuItem[] | undefined;
}

export const defaultMenuItems: MenuItem[] = [
    {
        title: 'Search',
        iconType: 'searchProfilerApp',
        route: '/',
        items: [
            {
                title: 'Template',
                iconType: 'list',
                route: '/template',
                items: [
                    {
                        title: 'Default',
                        iconType: 'list',
                        items: [
                            {
                                title: 'Template A',
                                iconType: 'search',
                                route: '/template/templateA',
                            },
                            {
                                title: 'Template B',
                                iconType: 'search',
                                route: '/template/templateB',
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
                route: '/reports',
            },
        ],
    },
    {
        title: 'Tools & Services',
        iconType: 'spacesApp',
        route: '/tools',
    },
];
