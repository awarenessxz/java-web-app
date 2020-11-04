import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { defaultMenuItems } from './AppMenuItems';
import { setSelectedMenuItem } from '../../redux/app/app-action';
import { RootState } from '../../redux/root-reducer';
import { MenuItem } from './AppSideBar.types';

const AppSidebar = (): JSX.Element => {
    const [navIsOpen, setIsNavOpen] = useState(true);
    const [navIsDocked, setIsNavDocked] = useState(true);
    const selectedMenuItem = useSelector((state: RootState) => state.app.selectedMenuItem);
    const dispatch = useDispatch();

    const dispatchSetSelectedMenuItem = (title: string): void => {
        dispatch(setSelectedMenuItem(title));
    };

    const createMenuItem = (menuItem: MenuItem): EuiSideNavItemType<any> => {
        // NOTE: Duplicate `name` values will cause `id` collisions.
        const icon = menuItem.iconType ? <EuiIcon type={menuItem.iconType} /> : undefined;
        return {
            icon,
            id: menuItem.title,
            name: menuItem.title,
            isSelected: selectedMenuItem === menuItem.title,
            onClick: (): void => dispatchSetSelectedMenuItem(menuItem.title),
            items: menuItem.items?.map((item) => createMenuItem(item)),
        };
    };

    const generateSideBarMenuItems = (): EuiSideNavItemType<any>[] => {
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
            <EuiFlexItem className="eui-yScroll">
                <EuiSideNav items={generateSideBarMenuItems()} style={{ padding: '16px' }} />
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
