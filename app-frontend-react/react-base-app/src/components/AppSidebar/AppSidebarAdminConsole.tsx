import React from 'react';
import { EuiCollapsibleNavGroup, EuiFlexItem, EuiListGroup } from '@elastic/eui';
import { adminConsoleMenuItems, MenuItem } from '../../utils/routing/app-menu-item';

interface AppSidebarAdminConsoleProps {
    goToRoute: (item: MenuItem) => void;
}

const AppSidebarAdminConsole = (props: AppSidebarAdminConsoleProps): JSX.Element => {
    const listItems = adminConsoleMenuItems.map((item) => {
        return {
            ...item,
            onClick: (): void => props.goToRoute(item),
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
                <div role="group">
                    <EuiListGroup listItems={listItems} flush />
                </div>
            </EuiCollapsibleNavGroup>
        </EuiFlexItem>
    );
};

export default AppSidebarAdminConsole;
