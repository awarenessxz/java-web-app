import React, { useState } from 'react';
import { EuiCollapsibleNav, EuiFlexItem, EuiHeaderSectionItemButton, EuiIcon } from '@elastic/eui';

const AppSidebar = (): JSX.Element => {
    const [navIsOpen, setIsNavOpen] = useState(false);
    const [navIsDocked, setIsNavDocked] = useState(false);

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
            onClose={(): void => setIsNavOpen(false)}
        >
            <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
                SOmerthing
            </EuiFlexItem>
        </EuiCollapsibleNav>
    );
};

export default AppSidebar;
