# Announcement Service

This is the Rest API for Announcement Service.

## Rest API

| API Endpoint | Request Type | Description |
| --- | --- | --- |
| /announcements/all | GET | Get all announcements available inside database |
| /announcements/all/page?limit=[VALUE]&offset=[VALUE] | GET | Get all announcements available inside database by page |
| /announcements/{id} | GET | Get announcement by ID |
| /announcements/{id} | DELETE | Delete announcement by ID |
| /announcements/{id} | PUT | Update announcement by ID |
| /announcements/new | POST | request body json = {Announcement Object}. Create a new announcement and store in database |
| /announcements/latest | GET | Get all active announcements |

## Schedule Jobs

| Service | Method | Description |
| --- | --- | --- |
| AnnouncementService | cleanUpAnnouncementActiveFlag | periodically clean up announcements' active flag in database |
