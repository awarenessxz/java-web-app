import { Moment } from 'moment';

export interface AnnouncementEntity {
    id?: string;
    content: string;
    author: string;
    title: string;
    announcementType: string;
    startDate: Moment;
    endDate: Moment;
    creationDate?: Moment;
    lastModifiedDate?: Moment;
    lastEditedBy?: string;
    activeFlag?: boolean;
}
