import React from 'react';
import AppContent from '../../components/AppContent/AppContent';
import AnnouncementListView from '../../components/Announcement/AnnouncementListView';

const AnnouncementPage = (): JSX.Element => {
    return (
        <AppContent title="Announcements">
            <AnnouncementListView />
        </AppContent>
    );
};

export default AnnouncementPage;
