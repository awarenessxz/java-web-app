import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { EuiBreadcrumb, EuiHeader, EuiHeaderLogo } from '@elastic/eui';
import AppHeaderKeypadMenu from './AppHeaderKeypadMenu';
import AppHeaderAnnouncementBtn from './AppHeaderAnnouncementBtn';
import AppSidebar from '../AppSidebar/AppSidebar';
import { MenuItem } from '../../../../config/app-menu-item-config';
import { convertRoutesArrToMap, getRoutePaths, initMenuItems, MenuItemMap } from '../../utils/navigation-utils';

const AppHeader = (): JSX.Element => {
    const routesMap = convertRoutesArrToMap();
    const [breadcrumbs, setBreadcrumbs] = useState<EuiBreadcrumb[]>([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | undefined>(undefined);
    const [menuItemMap, setMenuItemMap] = useState<MenuItemMap>({});
    const history = useHistory();
    const location = useLocation();

    const goToRoute = (input: string | undefined | MenuItem): void => {
        if (typeof input === 'object') {
            setSelectedMenuItem(input);
            if (input.route !== undefined) {
                history.push(input.route);
            }
        } else if (typeof input === 'string') {
            history.push(input);
            if (input in menuItemMap) {
                setSelectedMenuItem(menuItemMap[input]);
            }
        }
    };

    const generateBreadcrumbs = (): void => {
        const paths = getRoutePaths(location.pathname);
        const breadcrumbsArr: EuiBreadcrumb[] = [];
        let tempRoute = '';
        paths.forEach((path) => {
            tempRoute = tempRoute.concat('/').concat(path);
            const currentRoute = tempRoute;
            const breadcrumb: EuiBreadcrumb = {
                text: path,
            };
            if (currentRoute in routesMap) {
                breadcrumb.href = currentRoute;
                breadcrumb.onClick = (e): void => {
                    e.preventDefault();
                    goToRoute(currentRoute);
                };
            }
            breadcrumbsArr.push(breadcrumb);
        });
        setBreadcrumbs(breadcrumbsArr);
    };

    useEffect(() => {
        console.log('generating bread crumbs');
        generateBreadcrumbs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    useEffect(() => {
        console.log('selectedMenuItem Changed');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMenuItem]);

    useEffect(() => {
        console.log('init App Header');
        const results = initMenuItems();
        setSelectedMenuItem(results.selectedMenuItem);
        setMenuItemMap(results.menuItemsMapping);
        generateBreadcrumbs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Navigation Menu + Logo
    const leftSectionItems = [
        <AppSidebar key="appSidebar" selectedMenuItem={selectedMenuItem} goToRoute={goToRoute} />,
        <EuiHeaderLogo key="appLogo" iconType="logoElastic">
            Elastic
        </EuiHeaderLogo>,
    ];

    // Other Icons
    const rightSectionItems = [
        <AppHeaderAnnouncementBtn key="appAnnouncementBtn" />,
        <AppHeaderKeypadMenu key="appKeypadMenu" />,
    ];

    return (
        <EuiHeader
            position="fixed"
            sections={[
                {
                    items: leftSectionItems,
                    borders: 'right',
                    breadcrumbs,
                    breadcrumbProps: {
                        'aria-label': 'Header sections breadcrumbs',
                    },
                },
                {
                    items: rightSectionItems,
                },
            ]}
        />
    );
};

export default AppHeader;
