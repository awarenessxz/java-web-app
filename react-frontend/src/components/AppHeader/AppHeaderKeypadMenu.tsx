import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EuiHeaderSectionItemButton, EuiIcon, EuiKeyPadMenu, EuiKeyPadMenuItem, EuiPopover } from '@elastic/eui';
import { RootState } from '../../redux/root-reducer';
import { setIsAdminUser, setShowAnnouncement } from '../../redux/app/app-action';

const AppHeaderKeypadMenu = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const isAdmin = useSelector((state: RootState) => state.appReducer.isAdminUser);
    const showAnnouncement = useSelector((state: RootState) => state.appReducer.showAnnouncement);
    const dispatch = useDispatch();

    const toggleAdminState = (): void => {
        dispatch(setIsAdminUser(!isAdmin));
    };

    const toggleAnnouncement = (): void => {
        dispatch(setShowAnnouncement(!showAnnouncement));
    };

    const button = (
        <EuiHeaderSectionItemButton
            aria-controls="keypad_menu"
            aria-expanded={isOpen}
            aria-haspopup={true}
            aria-label="Keypad Menu for Demo"
            onClick={(): void => setIsOpen(!isOpen)}
        >
            <EuiIcon type="apps" size="m" />
        </EuiHeaderSectionItemButton>
    );

    return (
        <EuiPopover
            id="keypad_popover"
            ownFocus
            button={button}
            isOpen={isOpen}
            anchorPosition="downRight"
            closePopover={(): void => setIsOpen(false)}
        >
            <EuiKeyPadMenu id="keypad_menu">
                <EuiKeyPadMenuItem label={isAdmin ? 'Admin User' : 'Normal User'} onClick={toggleAdminState}>
                    <EuiIcon type="user" size="l" />
                </EuiKeyPadMenuItem>
                <EuiKeyPadMenuItem
                    label={`${showAnnouncement ? 'Hide' : 'Show'} Announcement`}
                    onClick={toggleAnnouncement}
                >
                    <EuiIcon type="user" size="l" />
                </EuiKeyPadMenuItem>
            </EuiKeyPadMenu>
        </EuiPopover>
    );
};

export default AppHeaderKeypadMenu;
