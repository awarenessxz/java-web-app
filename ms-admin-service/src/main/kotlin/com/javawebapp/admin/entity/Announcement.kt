package com.javawebapp.admin.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document(collection="announcements")
data class Announcement(
        @Id val id: String?,                  // mongoDB ID
        val content: String,                  // html content
        val snippets: String,                 // short display
        val author: String,                   // who created the announcement
        val startDate: LocalDateTime,         // when to start displaying announcement
        val endDate: LocalDateTime,           // when to stop displaying announcement
        var creationDate: LocalDateTime?,     // when was announcement created (latest announcement)
        var lastModifiedDate: LocalDateTime?, // last time announcement was edited
        var lastEditedBy: String?             // last person who edit the announcement
) {
    override fun toString(): String {
        return "Announcement { id=${id}, content=${content}, snippets=${snippets}, startDate=${startDate}, " +
                "endDate=${endDate}, creationDate=${creationDate}, lastModifiedDate=${lastModifiedDate}, " +
                "author=${author}, lastEditedBy=${lastEditedBy} }"
    }

    fun initAnnouncementMetadata() {
        val now = LocalDateTime.now()
        this.creationDate = now
        this.lastModifiedDate = now
        this.lastEditedBy = this.author
    }

    fun updateAnnouncementMetadata(lastEditedBy: String) {
        val now = LocalDateTime.now()
        this.lastModifiedDate = now
        this.lastEditedBy = lastEditedBy
    }
}