import moment, { Moment } from "moment";

export interface AnnouncementEntity {
    content: String;
    snippets: String;
    author: String;
    startDate: Moment;
    endDate: Moment;
}