import React, { Fragment, useEffect, useRef, useState } from 'react';
import { EuiLoadingSpinner, EuiTabbedContent, EuiTabbedContentTab, EuiSpacer } from '@elastic/eui';
import AppContent from '../../components/AppContent/AppContent';
import AnnouncementEditor from '../../components/Announcement/AnnouncementEditor';
import AnnouncementListView from '../../components/Announcement/AnnouncementListView';
import { AnnouncementEntity } from '../../api/announcement-api.types';

const AnnouncementsConsole = (): JSX.Element => {
    const [selectedTab, setSelectedTab] = useState<EuiTabbedContentTab | undefined>(undefined);
    const tabsRef = useRef<EuiTabbedContentTab[]>([]);
    const announcementRef = useRef<AnnouncementEntity | undefined>(undefined);

    const goToTab = (idx: number, announcement?: AnnouncementEntity): void => {
        announcementRef.current = announcement;
        // Note: This maybe hackish? But loadTabs() should be declared before goToTab is called. Refer to Javascript Hoisting for more information
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        loadTabs(); // refresh the tabs.
        setSelectedTab(tabsRef.current[idx]);
    };

    const loadTabs = (): void => {
        tabsRef.current = [
            {
                id: 'manageId',
                name: 'Manage Announcements',
                content: (
                    <Fragment>
                        <EuiSpacer />
                        <AnnouncementListView isAdminView={true} handleChangeTab={goToTab} />
                    </Fragment>
                ),
            },
            {
                id: 'editId',
                name: 'Editor',
                content: (
                    <Fragment>
                        <EuiSpacer />
                        <AnnouncementEditor announcementInput={announcementRef.current} />
                    </Fragment>
                ),
            },
        ];
    };

    useEffect(() => {
        loadTabs();
        setSelectedTab(tabsRef.current[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppContent title="Admin Announcement Console">
            {selectedTab ? (
                <EuiTabbedContent
                    tabs={tabsRef.current}
                    selectedTab={selectedTab}
                    onTabClick={(tab): void => {
                        announcementRef.current = undefined;
                        loadTabs(); // refresh the tabs
                        setSelectedTab(tab);
                    }}
                />
            ) : (
                <EuiLoadingSpinner size="xl" />
            )}
        </AppContent>
    );
};

export default AnnouncementsConsole;
