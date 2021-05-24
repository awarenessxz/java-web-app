import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    EuiCollapsibleNav,
    EuiCollapsibleNavGroup,
    EuiFlexItem,
    EuiHeaderSectionItemButton,
    EuiShowFor,
    EuiListGroupItem,
    EuiIcon,
    EuiSideNav,
    EuiSideNavItemType,
} from '@elastic/eui';
import AppSidebarAdminConsole from './AppSidebarAdminConsole';
import AppSidebarAnnouncement from './AppSidebarAnnouncement';
import { RootState } from '../../../../redux/root-reducer';
import { MenuItem, sidebarMenuItems } from '../../../../config/app-menu-item-config';

interface AppSidebarProps {
    selectedMenuItem: MenuItem | undefined;
    goToRoute: (input: string | undefined | MenuItem) => void;
}

const AppSidebar = (props: AppSidebarProps): JSX.Element => {
    const [navIsOpen, setIsNavOpen] = useState(true);
    const [navIsDocked, setIsNavDocked] = useState(true);
    const isAdminUser = useSelector((state: RootState) => state.app.isAdminUser);
    const showAnnouncement = useSelector((state: RootState) => state.announcement.showAnnouncement);

    // function for recursively create menu item in side nav
    const createMenuItem = (menuItem: MenuItem): EuiSideNavItemType<any> => {
        // NOTE: Duplicate `name` values will cause `id` collisions.
        const mMenuItem = { ...menuItem };
        const icon = mMenuItem.iconType ? <EuiIcon type={mMenuItem.iconType} /> : undefined;
        return {
            icon,
            id: mMenuItem.title,
            name: mMenuItem.title,
            isSelected: props.selectedMenuItem?.title === mMenuItem.title,
            onClick: (): void => props.goToRoute(mMenuItem),
            items: mMenuItem.items?.map((item) => createMenuItem(item)),
        };
    };

    // function to re-render sidebar every time user clicks on menu items
    const generateSideBarMenuItems = (): EuiSideNavItemType<any>[] => {
        if (props.selectedMenuItem === undefined) {
            return [];
        }
        return sidebarMenuItems.map((item) => createMenuItem(item));
    };

    return (
        <EuiCollapsibleNav
            id="collapsibleNavSideBar"
            aria-label="Main navigation"
            isOpen={navIsOpen}
            isDocked={navIsDocked}
            button={
                <EuiHeaderSectionItemButton
                    aria-label="Toggle main navigation"
                    onClick={(): void => setIsNavOpen(!navIsOpen)}
                >
                    <EuiIcon type={'menu'} size="m" aria-hidden="true" />
                </EuiHeaderSectionItemButton>
            }
            showCloseButton={false}
        >
            {/* Admin Console */}
            {isAdminUser && <AppSidebarAdminConsole goToRoute={props.goToRoute} />}

            <EuiFlexItem className="eui-yScroll">
                {/* Announcement Section */}
                {showAnnouncement && <AppSidebarAnnouncement />}

                {/* Side Navigation Bar */}
                <EuiCollapsibleNavGroup>
                    <EuiSideNav items={generateSideBarMenuItems()} style={{ padding: '8px' }} />
                </EuiCollapsibleNavGroup>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
                <EuiShowFor sizes={['l', 'xl']}>
                    <EuiCollapsibleNavGroup>
                        <EuiListGroupItem
                            size="xs"
                            color="subdued"
                            label={`${navIsDocked ? 'Undock' : 'Dock'} navigation`}
                            onClick={(): void => {
                                setIsNavDocked(!navIsDocked);
                                setIsNavOpen(false);
                            }}
                            iconType={navIsDocked ? 'lock' : 'lockOpen'}
                        />
                    </EuiCollapsibleNavGroup>
                </EuiShowFor>
            </EuiFlexItem>
        </EuiCollapsibleNav>
    );
};

export default AppSidebar;
