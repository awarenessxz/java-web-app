import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { EuiBreadcrumb, EuiHeader, EuiHeaderLogo } from '@elastic/eui';
import AppHeaderKeypadMenu from './AppHeaderKeypadMenu';
import AppSidebar from '../AppSidebar/AppSidebar';
import { setSelectedMenuItem } from '../../redux/app/app-action';
import { RootState } from '../../redux/root-reducer';
import { MenuItem } from '../../utils/routing/navigation-utils';

const AppHeader = (): JSX.Element => {
    const [breadcrumbs, setBreadcrumbs] = useState<EuiBreadcrumb[]>([]);
    const selectedMenuItem = useSelector((state: RootState) => state.app.selectedMenuItem);
    const dispatch = useDispatch();
    const history = useHistory();

    const goToRoute = (item: MenuItem): void => {
        dispatch(setSelectedMenuItem(item));
        if (item.route !== undefined) {
            history.push(item.route);
        }
    };

    // function for recursively create breadcrumbs in header
    const createBreadcrumb = (breadcrumbsArr: EuiBreadcrumb[], menuItem: MenuItem): void => {
        const breadcrumb: EuiBreadcrumb = {
            text: menuItem.title,
        };
        if (menuItem.route !== undefined) {
            breadcrumb.href = menuItem.route;
            breadcrumb.onClick = (e): void => {
                e.preventDefault();
                goToRoute(menuItem);
            };
        }
        if (menuItem.parent !== undefined) {
            createBreadcrumb(breadcrumbsArr, menuItem.parent);
        }
        breadcrumbsArr.push(breadcrumb);
    };

    // function to re-render breadcrumbs in header every time user clicks on menu items
    const generateBreadcrumbs = (): void => {
        const breadcrumbsArr: EuiBreadcrumb[] = [];
        if (selectedMenuItem !== undefined) {
            createBreadcrumb(breadcrumbsArr, selectedMenuItem);
        }
        setBreadcrumbs(breadcrumbsArr);
    };

    useEffect(() => {
        // re-render breadcrumbs whenever selected menuItem changes
        generateBreadcrumbs();
    }, [selectedMenuItem]);

    // Navigation Menu + Logo
    const leftSectionItems = [
        <AppSidebar key="appSidebar" />,
        <EuiHeaderLogo key="appLogo" iconType="logoElastic">
            Elastic
        </EuiHeaderLogo>,
    ];

    // Other Icons
    const rightSectionItems = [<AppHeaderKeypadMenu key="appKeypadMenu" />];

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
