# Announcement Feature

This is 

## Rest API

| API Endpoint | Request Type | Description |
| --- | --- | --- |
| /announcements/all | GET | Get all announcements available inside database |
| /announcements/all/page?limit=[_]&offset=[_] | GET | Get all announcements available inside database by page |
| /announcements/{id} | GET | Get announcement by ID |
| /announcements/{id} | DELETE | Delete announcement by ID |
| /announcements/{id} | PUT | Update announcement by ID |
| /announcements/new | POST | json = {Announcement Object}. Create a new announcement and store in database |

## Schedule Jobs

