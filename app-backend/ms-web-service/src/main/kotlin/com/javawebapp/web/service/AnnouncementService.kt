package com.javawebapp.web.service

import com.javawebapp.web.model.Announcement
import com.javawebapp.web.event.EventPayloadModel
import com.javawebapp.web.event.EventType
import com.javawebapp.web.event.NotificationBinding
import com.javawebapp.web.exception.ApiException
import com.javawebapp.web.exception.ErrorTypes
import com.javawebapp.web.repository.AnnouncementRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.messaging.support.MessageBuilder
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service

@Service
class AnnouncementService(
        private val announcementRepository: AnnouncementRepository,
        private val notificationBinding: NotificationBinding
) {
    fun getAllAnnouncements(): List<Announcement> {
        return announcementRepository.findByOrderByCreationDateDesc()
    }

    fun getAnnouncementsByPagination(limit: Int, offset: Int): List<Announcement> {
        val page = PageRequest.of(offset, limit, Sort.by(Sort.Direction.DESC, "creationDate"))
        val pageResults = announcementRepository.findAll(page)
        return pageResults.content
    }

    fun getLatestAnnouncements(): List<Announcement> {
        return announcementRepository.findAnnouncementByActiveFlag(true)
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
        // add announcement to database
        announcementRepository.insert(announcement)
        // publish announcement to client via event
        val payload = EventPayloadModel(EventType.NEW_ANNOUNCEMENT, announcement)
        val message = MessageBuilder.withPayload(payload).build()
        notificationBinding.outboundNotificationChannel().send(message)
    }

    fun updateAnnouncementById(announcement: Announcement) {
        announcement.updateAnnouncementMetadata()
        announcementRepository.save(announcement)
    }

    // @Scheduled(fixedDelay = 500000L)
    @Scheduled(cron = "0 0 0 * * *") // second, minute, hour, day of month, month, day(s) of week
    fun cleanUpAnnouncementActiveFlag() {
        System.out.println("Schedule Job to clean up announcement active flag is running...")
        val announcements = announcementRepository.findAnnouncementByActiveFlag(true)
        for (announcement in announcements) {
            if (!announcement.isActive()) {
                announcement.activeFlag = false
                announcementRepository.save(announcement)
            }
        }
    }
}
