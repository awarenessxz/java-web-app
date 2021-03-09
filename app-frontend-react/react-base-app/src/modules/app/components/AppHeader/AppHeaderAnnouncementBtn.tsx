import React from 'react';
import { useHistory } from 'react-router-dom';
import { EuiHeaderSectionItemButton, EuiIcon } from '@elastic/eui';

const AppHeaderAnnouncementBtn = (): JSX.Element => {
    const history = useHistory();

    return (
        <EuiHeaderSectionItemButton aria-label="Announcement Menu" onClick={(): void => history.push('/announcements')}>
            <EuiIcon type="cheer" size="m" />
        </EuiHeaderSectionItemButton>
    );
};

export default AppHeaderAnnouncementBtn;
