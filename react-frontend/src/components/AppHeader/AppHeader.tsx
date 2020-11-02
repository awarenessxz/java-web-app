import React from 'react';
import { EuiBreadcrumb, EuiHeader, EuiHeaderLogo } from '@elastic/eui';
import AppSidebar from '../AppSidebar/AppSidebar';

const AppHeader = (): JSX.Element => {
    // temporary solution
    const breadcrumbs: EuiBreadcrumb[] = [
        {
            text: 'Management',
            href: '#',
            onClick: (e): void => {
                e.preventDefault();
            },
        },
        {
            text: 'Users',
            href: '#',
            onClick: (e): void => {
                e.preventDefault();
            },
        },
        {
            text: 'Create',
        },
    ];

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
