package com.javawebapp.admin.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document(collection="announcements")
data class Announcement(
        @Id val id: String,         // mongoDB ID
        val content: String,        // html content
        val snippets: String?,        // short display
        val startDate: Date?,        // when to start displaying announcement
        val endDate: Date?,          // when to stop displaying announcement
        val creationDate: Date?,     // when was announcement created (latest announcement)
        val lastModifiedDate: Date?, // last time announcement was edited
        val author: String?,         // who created the announcement
        val lastEditedBy: String?    // last person who edit the announcement
)