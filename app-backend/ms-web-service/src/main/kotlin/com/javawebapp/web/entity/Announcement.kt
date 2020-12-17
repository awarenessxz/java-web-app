package com.javawebapp.web.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.ZonedDateTime

@Document(collection="announcements")
data class Announcement(
    @Id val id: String?,                  // mongoDB ID
    val title: String,                    // announcement header
    val content: String,                  // html content
    val announcementType: String,         // type of announcement
    val author: String,                   // who created the announcement
    val startDate: ZonedDateTime,         // when to start displaying announcement
    val endDate: ZonedDateTime,           // when to stop displaying announcement
    var creationDate: ZonedDateTime?,     // when was announcement created (latest announcement)
    var lastModifiedDate: ZonedDateTime?, // last time announcement was edited
    var lastEditedBy: String?,            // last person who edit the announcement
    var activeFlag: Boolean?              // determine if announcement is still active
) {
    override fun toString(): String {
        return "Announcement { id=${id}, content=${content}, header=${title}, startDate=${startDate}, " +
                "endDate=${endDate}, creationDate=${creationDate}, lastModifiedDate=${lastModifiedDate}, " +
                "author=${author}, lastEditedBy=${lastEditedBy} }"
    }

    fun isActive(): Boolean {
        val now = ZonedDateTime.now()
        return (now.isBefore(endDate) && now.isAfter(startDate)) || (now.toLocalDate() == startDate.toLocalDate()) || (now.toLocalDate() == endDate.toLocalDate())
    }

    fun initAnnouncementMetadata() {
        val now = ZonedDateTime.now()
        creationDate = now
        lastModifiedDate = now
        lastEditedBy = this.author
        activeFlag = isActive()
    }

    fun updateAnnouncementMetadata() {
        val now = ZonedDateTime.now()
        lastModifiedDate = now
        activeFlag = isActive()
    }
}