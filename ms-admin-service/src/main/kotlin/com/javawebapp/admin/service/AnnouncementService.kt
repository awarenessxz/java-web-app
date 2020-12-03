package com.javawebapp.admin.service

import com.javawebapp.admin.entity.Announcement
import com.javawebapp.admin.exception.ApiException
import com.javawebapp.admin.exception.ErrorTypes
import com.javawebapp.admin.repository.AnnouncementRepository
import org.springframework.stereotype.Service

@Service
class AnnouncementService(
        private val announcementRepository: AnnouncementRepository
) {
    fun getAllAnnouncements(): List<Announcement> {
        return announcementRepository.findAll()
    }

    fun getAnnouncementById(id: String): Announcement? {
        val announcement = announcementRepository.findById(id)
        if (announcement.isPresent) {
            return announcement.get()
        } else {
            throw ApiException("Announcement ID '${id}' is not found!", ErrorTypes.ANNOUNCEMENT_ID_NOT_FOUND)
        }
    }

    fun deleteAnnouncementById(id: String) {
        announcementRepository.deleteById(id)
    }

    fun createNewAnnouncement(announcement: Announcement) {
        announcement.initAnnouncementMetadata()
        announcementRepository.insert(announcement)
    }

    fun updateAnnouncementById(announcement: Announcement) {
        announcement.updateAnnouncementMetadata()
        announcementRepository.save(announcement)
    }
}