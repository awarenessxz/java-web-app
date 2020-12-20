import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EuiButtonIcon, EuiCollapsibleNavGroup, EuiText } from '@elastic/eui';
import { setShowAnnouncement } from '../../redux/app/app-action';
import { RootState } from '../../redux/root-reducer';
import EuiCustomLink from '../../utils/routing/EuiCustomLink';
import useLocalStorageState from '../../utils/hooks/UseLocalStorageState';

const AppSidebarAnnouncement = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [readAnnouncementIds, setAnnouncementIdsInLocalStorage] = useLocalStorageState('readAnnouncementIds', '[]');
    const announcements = useSelector((state: RootState) => state.app.announcements);
    const dispatch = useDispatch();

    const closeAnnouncement = (): void => {
        dispatch(setShowAnnouncement(false));
    };

    const loadAnnouncementText = (): JSX.Element => {
        let readAnnouncementsCount = 0;
        if (readAnnouncementIds) {
            const readAnnouncementIdsArr: string[] = JSON.parse(readAnnouncementIds) as string[];
            readAnnouncementsCount = readAnnouncementIdsArr.length;
        }
        const newAnnouncementCount = announcements.length - readAnnouncementsCount;
        return (
            <React.Fragment>
                <b>{newAnnouncementCount}</b> new announcements!
            </React.Fragment>
        );
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
            <EuiText size="s" style={{ padding: '0 8px 8px' }}>
                <p>
                    {loadAnnouncementText()}
                    <EuiCustomLink to="/announcements"> Check it out!</EuiCustomLink>
                </p>
            </EuiText>
        </EuiCollapsibleNavGroup>
    );
};

export default AppSidebarAnnouncement;
