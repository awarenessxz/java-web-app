import React, { Fragment } from 'react';
import { EuiTabbedContent, EuiSpacer } from '@elastic/eui';
import AppContent from '../../components/AppContent/AppContent';
import AnnouncementEditor from '../../components/Announcement/AnnouncementEditor';
import AnnouncementListView from '../../components/Announcement/AnnouncementListView';

const AnnouncementsConsole = (): JSX.Element => {
    const tabs = [
        {
            id: 'manage--id',
            name: 'Manage Announcements',
            content: (
                <Fragment>
                    <EuiSpacer />
                    <AnnouncementListView />
                </Fragment>
            ),
        },
        {
            id: 'edit--id',
            name: 'Editor',
            content: (
                <Fragment>
                    <EuiSpacer />
                    <AnnouncementEditor />
                </Fragment>
            ),
        },
    ];

    return (
        <AppContent title="Admin Announcement Console">
            <EuiTabbedContent
                tabs={tabs}
                initialSelectedTab={tabs[0]}
                autoFocus="selected"
                onTabClick={(tab) => {
                    console.log('clicked tab', tab);
                }}
            />
        </AppContent>
    );
};

export default AnnouncementsConsole;
