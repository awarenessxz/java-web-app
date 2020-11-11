// ******************************************************************************* React
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// ******************************************************************************* Redux Actions
import { RootState } from '../../redux/root-reducer';
import { setSelectedMenuItem } from '../../redux/app/app-action';
// ******************************************************************************* Utility Functions
import { MenuItem } from '../../utils/routing/AppMenuItems';
// ******************************************************************************* Components / Pages
import { EuiBreadcrumb, EuiHeader, EuiHeaderLogo } from '@elastic/eui';
import AppSidebar from '../AppSidebar/AppSidebar';

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
            setBreadcrumbs(breadcrumbsArr);
        }
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
            ]}
        />
    );
};

export default AppHeader;
