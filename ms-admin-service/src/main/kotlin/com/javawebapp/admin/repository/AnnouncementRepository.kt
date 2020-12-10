package com.javawebapp.admin.repository

import com.javawebapp.admin.entity.Announcement
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface AnnouncementRepository : MongoRepository<Announcement, String> {
    fun findAnnouncementByActiveFlag(activeFlag: Boolean): List<Announcement>
}
