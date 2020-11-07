import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { EuiBreadcrumb, EuiHeader, EuiHeaderLogo } from '@elastic/eui';
import AppSidebar from '../AppSidebar/AppSidebar';
import { MenuItem } from '../AppSidebar/AppMenuItems';
import { RootState } from '../../redux/root-reducer';
import { setSelectedMenuItem } from '../../redux/app/app-action';

const AppHeader = (): JSX.Element => {
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
    const createBreadcrumb = (breadcrumbs: EuiBreadcrumb[], menuItem: MenuItem): void => {
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
            createBreadcrumb(breadcrumbs, menuItem.parent);
        }
        breadcrumbs.push(breadcrumb);
    };

    // function to re-render breadcrumbs in header every time user clicks on menu items
    const generateBreadcrumbs = (): EuiBreadcrumb[] => {
        const breadcrumbs: EuiBreadcrumb[] = [];
        if (selectedMenuItem !== undefined) {
            createBreadcrumb(breadcrumbs, selectedMenuItem);
        }
        return breadcrumbs;
    };

    // Navigation Menu + Logo
    const leftSectionItems = [
        <AppSidebar key="appSidebar" />,
        <EuiHeaderLogo key="appLogo" iconType="logoElastic">
            Elastic
        </EuiHeaderLogo>,
    ];

    return (
        <EuiHeader
            position="fixed"
            sections={[
                {
                    items: leftSectionItems,
                    borders: 'right',
                    breadcrumbs: generateBreadcrumbs(),
                    breadcrumbProps: {
                        'aria-label': 'Header sections breadcrumbs',
                    },
                },
            ]}
        />
    );
};

export default AppHeader;
