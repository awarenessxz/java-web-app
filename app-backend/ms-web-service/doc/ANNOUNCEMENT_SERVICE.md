# Announcement Service

Announcement Service basically handles all announcement related activities for the web app.

## Rest API

| API Endpoint | Request Type | Description |
| --- | --- | --- |
| /announcements/all | GET | Get all announcements available inside database |
| /announcements/all/page?limit=[VALUE]&offset=[VALUE] | GET | Get all announcements available inside database by page |
| /announcements/{id} | GET | Get announcement by ID |
| /announcements/{id} | DELETE | Delete announcement by ID |
| /announcements/{id} | PUT | Update announcement by ID |
| /announcements/new | POST | request body json = {Announcement Object}. Create a new announcement, store in database and notify web app of new announcement via websocket |
| /announcements/latest | GET | Get all active announcements |

## Scheduled Jobs

| Method | Description |
| --- | --- |
| cleanUpAnnouncementActiveFlag | periodically clean up announcements' active flag in database |
