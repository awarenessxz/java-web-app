import React, { Fragment } from 'react';
import AppContent from '../../components/AppContent/AppContent';
import {EuiButton} from "@elastic/eui";
import { AnnouncementEntity } from "../../types/api/announcement-api.types";

const AnnouncementsConsole = (): JSX.Element => {
    const handleOnClick = () => {
        const reqBody: AnnouncementEntity = {
            content: "something",
            snippets: "Something",
            author: "Something",
        };
        fetch('/announcements/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
            .then(res => res.text())
            .then(data => console.log(data));
    };

    return (
        <AppContent title="Admin Announcement Console">
            <Fragment>
                <EuiButton onClick={handleOnClick}/>
            </Fragment>
        </AppContent>
    );
};

export default AnnouncementsConsole;
