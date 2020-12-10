package com.javawebapp.admin.service

import com.javawebapp.admin.entity.Announcement
import com.javawebapp.admin.exception.ApiException
import com.javawebapp.admin.exception.ErrorTypes
import com.javawebapp.admin.repository.AnnouncementRepository
import org.springframework.data.domain.PageRequest
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service

@Service
class AnnouncementService(
        private val announcementRepository: AnnouncementRepository
) {
    fun getAllAnnouncements(): List<Announcement> {
        return announcementRepository.findAll()
    }

    fun getAnnouncementsByPagination(limit: Int, offset: Int): List<Announcement> {
        val page = PageRequest.of(offset, limit)
        val pageResults = announcementRepository.findAll(page)
        return pageResults.content
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

    @Scheduled(fixedDelay = 5000L)
    fun cleanUpAnnouncementActiveFlag() {
        System.out.println("Schedule Job to clean up announcement active flag is running...")
        val announcements = announcementRepository.findAnnouncementByActiveFlag(true)
        for (announcement in announcements) {
            if (!announcement.isActive()) {
                announcement.activeFlag = false
                announcementRepository.save(announcement)
            }
        }
        System.out.println(announcements);
    }
}
