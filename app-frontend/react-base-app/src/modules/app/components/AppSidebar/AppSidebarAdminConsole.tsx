import React from 'react';
import { EuiCollapsibleNavGroup, EuiFlexItem, EuiListGroup } from '@elastic/eui';
import { MenuItem, sidebarAdminMenuItems } from '../../../../config/app-menu-item-config';

interface AppSidebarAdminConsoleProps {
    goToRoute: (input: string | undefined | MenuItem) => void;
}

const AppSidebarAdminConsole = (props: AppSidebarAdminConsoleProps): JSX.Element => {
    const listItems = sidebarAdminMenuItems.map((item) => {
        return {
            ...item,
            onClick: (): void => props.goToRoute(item.route),
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
