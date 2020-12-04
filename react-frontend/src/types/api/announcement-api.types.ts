import { Moment } from 'moment';

export interface AnnouncementEntity {
    content: string;
    snippets: string;
    author: string;
    header: string;
    announcementType: string;
    startDate: Moment;
    endDate: Moment;
}
