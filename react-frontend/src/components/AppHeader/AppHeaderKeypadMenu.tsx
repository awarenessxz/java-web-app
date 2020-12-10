import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EuiHeaderSectionItemButton, EuiIcon, EuiKeyPadMenu, EuiKeyPadMenuItem, EuiPopover } from '@elastic/eui';
import moment from 'moment';
import { RootState } from '../../redux/root-reducer';
import { setIsAdminUser, setShowAnnouncement } from '../../redux/app/app-action';
import { AnnouncementEntity } from '../../types/api/announcement-api.types';

const AppHeaderKeypadMenu = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const isAdmin = useSelector((state: RootState) => state.app.isAdminUser);
    const showAnnouncement = useSelector((state: RootState) => state.app.showAnnouncement);
    const dispatch = useDispatch();

    const toggleAdminState = (): void => {
        dispatch(setIsAdminUser(!isAdmin));
    };

    const toggleAnnouncement = (): void => {
        dispatch(setShowAnnouncement(!showAnnouncement));
    };

    const submitMockAnnouncement = (): void => {
        const reqBody: AnnouncementEntity = {
            content: 'something',
            title: 'title 01',
            author: 'Something',
            announcementType: 'GENERAL',
            startDate: moment(),
            endDate: moment(),
        };
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetch('/announcements/new', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        })
            .then((res) => res.text())
            .then((data) => console.log(data));
        alert('created a new announcement');
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
                    <EuiIcon type="cheer" size="l" />
                </EuiKeyPadMenuItem>
                <EuiKeyPadMenuItem label="Mock Submit Announcement" onClick={submitMockAnnouncement}>
                    <EuiIcon type="cheer" size="l" />
                </EuiKeyPadMenuItem>
            </EuiKeyPadMenu>
        </EuiPopover>
    );
};

export default AppHeaderKeypadMenu;
