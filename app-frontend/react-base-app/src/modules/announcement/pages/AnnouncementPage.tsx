import React from 'react';
import AppContent from '../../app/components/AppContent/AppContent';
import AnnouncementListView from '../components/AnnouncementListView';

const AnnouncementPage = (): JSX.Element => {
    return (
        <AppContent title="Announcements">
            <AnnouncementListView />
        </AppContent>
    );
};

export default AnnouncementPage;
