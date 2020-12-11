package com.javawebapp.notification.model

import java.time.ZonedDateTime

data class Announcement(
        val id: String?,                      // mongoDB ID
        val title: String,                    // announcement header
        val content: String,                  // html content
        val announcementType: String,         // type of announcement
        val author: String,                   // who created the announcement
        val startDate: ZonedDateTime,         // when to start displaying announcement
        val endDate: ZonedDateTime,           // when to stop displaying announcement
        var creationDate: ZonedDateTime?,     // when was announcement created (latest announcement)
        var lastModifiedDate: ZonedDateTime?, // last time announcement was edited
        var lastEditedBy: String?,            // last person who edit the announcement
        var activeFlag: Boolean?
)