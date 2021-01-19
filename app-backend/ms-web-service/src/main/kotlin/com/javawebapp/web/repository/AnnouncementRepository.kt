package com.javawebapp.web.repository

import com.javawebapp.web.model.Announcement
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface AnnouncementRepository : MongoRepository<Announcement, String> {
    fun findAnnouncementByActiveFlag(activeFlag: Boolean): List<Announcement>

    fun findByOrderByCreationDateDesc(): List<Announcement>
}
