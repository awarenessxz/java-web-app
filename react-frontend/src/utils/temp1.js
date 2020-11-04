/*
const PLACEHOLDER_KEY = "{{placeholder}}";

const defaultMenuItems = {
    items: [
        {
            id: _.uniqueId('nav-store-'),
            title: 'search',
            icon: 'something',
            route: '/'
            items: PLACEHOLDER_KEY
        }
    ]
};

const getCurrentROute = () => {
    window.location.hash.replace(/#/, '');
};

// object for checking menu item state
export const menuItemStateHelper = {
    isOpen: menuItem => {
        const path = getCurrentROute();
        const pathname = path[0] === '/' && path.length !== 1 ? path.substr(1): path;
        return _.startswidth(pathname, menuitem.route) || menuItemStateHelper.hasOpenChildren(menuItem)
    },
    hasOpenchild: menuItem => _.some(menuitem.items, child => menuItemStateHelper.isOpen(child)),
    isActive: menuItem => getCurrentROute() === menuItem.route || (menuItemStateHelper.isOpen(menuItem) && !menuItem.parent),
    isSibling: (menuItemA, menuItemB) => menuItemA.id !== menuItemB.id && menuItemA.parent && _.some(menuItemA.parent.items, child => child.id === menuItemB.id && child.id !== menuItemA.id),
    isParentOf: (menuItemA, menuItemB) => menuItemA.items && _.some(menuItemA.items, _item => _item.id === menuItemB.id || menuItemStateHelper.isParentOf(_item, menuItemB)),
};

const sideNav = [
        createItem('Elasticsearch', {
            icon: <EuiIcon type="logoElasticsearch" />,
            items: [
                createItem('Data sources'),
                createItem('Users'),
                createItem('Roles'),
                createItem('Watches'),
                createItem('Extremely long title will become truncated when the browser is narrow enough'),
            ],
        }),
        createItem('Kibana', {
            icon: <EuiIcon type="logoKibana" />,
            items: [
                createItem('Advanced settings', {
                    items: [
                        createItem('General'),
                        createItem('Timelion', {
                            items: [
                                createItem('Time stuff', {
                                    icon: <EuiIcon type="clock" />,
                                }),
                                createItem('Lion stuff', {
                                    icon: <EuiIcon type="stats" />,
                                }),
                            ],
                        }),
                        createItem('Visualizations'),
                    ],
                }),
                createItem('Index Patterns'),
                createItem('Saved Objects'),
                createItem('Reporting'),
            ],
        }),
        createItem('Logstash', {
            icon: <EuiIcon type="logoLogstash" />,
            items: [createItem('Pipeline viewer')],
        }),
    ];
 */