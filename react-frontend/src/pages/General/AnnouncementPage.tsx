import React, { Fragment } from 'react';
import moment from 'moment';
import { EuiButton } from '@elastic/eui';
import AppContent from '../../components/AppContent/AppContent';
import { AnnouncementEntity } from '../../types/api/announcement-api.types';

const AnnouncementPage = (): JSX.Element => {
    const handleOnClick = () => {
        const reqBody: AnnouncementEntity = {
            content: 'something',
            snippets: 'Something',
            author: 'Something',
            startDate: moment(),
            endDate: moment(),
        };
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
    };

    return (
        <AppContent title="Announcements">
            <Fragment>
                <EuiButton onClick={handleOnClick} />
            </Fragment>
        </AppContent>
    );
};

export default AnnouncementPage;
