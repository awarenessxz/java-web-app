import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import { setSelectedMenuItem } from '../../redux/app/app-action';
import { RootState } from '../../redux/root-reducer';
import { defaultMenuItems, MenuItem } from '../../utils/routing/app-menu-item';

const AppSidebar = (): JSX.Element => {
    const [navIsOpen, setIsNavOpen] = useState(true);
    const [navIsDocked, setIsNavDocked] = useState(true);
    const selectedMenuItem = useSelector((state: RootState) => state.appReducer.selectedMenuItem);
    const isAdminUser = useSelector((state: RootState) => state.appReducer.isAdminUser);
    const showAnnouncement = useSelector((state: RootState) => state.appReducer.showAnnouncement);
    const dispatch = useDispatch();
    const history = useHistory();

    const goToRoute = (item: MenuItem): void => {
        dispatch(setSelectedMenuItem(item));
        if (item.route !== undefined) {
            history.push(item.route);
        }
    };

    // function for recursively create menu item in side nav
    const createMenuItem = (menuItem: MenuItem, parent?: MenuItem): EuiSideNavItemType<any> => {
        // NOTE: Duplicate `name` values will cause `id` collisions.
        const mMenuItem = { ...menuItem };
        const icon = mMenuItem.iconType ? <EuiIcon type={mMenuItem.iconType} /> : undefined;
        if (parent !== undefined) {
            mMenuItem.parent = { ...parent, items: undefined }; // removes the items to prevent recursive stack overflow
        }
        return {
            icon,
            id: mMenuItem.title,
            name: mMenuItem.title,
            isSelected: selectedMenuItem?.title === mMenuItem.title,
            onClick: (): void => goToRoute(mMenuItem),
            items: mMenuItem.items?.map((item) => createMenuItem(item, mMenuItem)),
        };
    };

    // function to re-render sidebar every time user clicks on menu items
    const generateSideBarMenuItems = (): EuiSideNavItemType<any>[] => {
        if (selectedMenuItem === undefined) {
            return [];
        }
        return defaultMenuItems.map((item) => createMenuItem(item));
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
            {/* Console */}
            {isAdminUser && <AppSidebarAdminConsole goToRoute={goToRoute} />}

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
