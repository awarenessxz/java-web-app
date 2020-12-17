import React from 'react';
import { useDispatch } from 'react-redux';
import { EuiButtonIcon, EuiCollapsibleNavGroup, EuiText, EuiLink } from '@elastic/eui';
import { setShowAnnouncement } from '../../redux/app/app-action';

const AppSidebarAnnouncement = (): JSX.Element => {
    const dispatch = useDispatch();

    const closeAnnouncement = (): void => {
        dispatch(setShowAnnouncement(false));
    };

    return (
        <EuiCollapsibleNavGroup
            iconType="cheer"
            title="New Announcements"
            isCollapsible={true}
            initialIsOpen={true}
            arrowDisplay="none"
            style={{ backgroundColor: '#F2CE46' }}
            extraAction={
                <EuiButtonIcon
                    aria-label="Close Announcement"
                    title="Close Announcement"
                    iconType="cross"
                    onClick={closeAnnouncement}
                />
            }
        >
            <EuiText size="s" color="subdued" style={{ padding: '0 8px 8px' }}>
                <p>
                    Threat prevention, detection, and response with SIEM and endpoint security.
                    <br />
                    <EuiLink>Learn more</EuiLink>
                </p>
            </EuiText>
        </EuiCollapsibleNavGroup>
    );
};

export default AppSidebarAnnouncement;
