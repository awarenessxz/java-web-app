import React from 'react';
import { EuiCollapsibleNavGroup, EuiFlexItem, EuiListGroup } from '@elastic/eui';
import { adminConsoleMenuItems, AdminMenuItem } from '../../utils/routing/app-admin-menu';
import { MenuItem } from '../../utils/routing/navigation-utils';

interface AppSidebarAdminConsoleProps {
    goToRoute: (item: MenuItem) => void;
}

const AppSidebarAdminConsole = (props: AppSidebarAdminConsoleProps): JSX.Element => {
    const goToRoute = (item: AdminMenuItem): void => {
        const menuItem: MenuItem = {
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            title: item.label?.toString()!,
            iconType: item.iconType?.toString(),
            route: item.route,
            parent: {
                title: 'admin',
            },
        };
        props.goToRoute(menuItem);
    };

    const listItems = adminConsoleMenuItems.map((item) => {
        return {
            ...item,
            onClick: (): void => goToRoute(item),
        };
    });

    return (
        <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
            <EuiCollapsibleNavGroup
                title={
                    <span>
                        <strong>Admin Console</strong>
                    </span>
                }
                iconType="logoGCPMono"
                iconSize="xl"
                isCollapsible={true}
                initialIsOpen={false}
                background="dark"
            >
                <div role="group" className="kibanaNavDeployment__content">
                    <EuiListGroup listItems={listItems} flush />
                </div>
            </EuiCollapsibleNavGroup>
        </EuiFlexItem>
    );
};

export default AppSidebarAdminConsole;
