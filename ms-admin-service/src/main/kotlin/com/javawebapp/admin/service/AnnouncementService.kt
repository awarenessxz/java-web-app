package com.javawebapp.admin.service

import com.javawebapp.admin.entity.Announcement
import com.javawebapp.admin.exception.ApiException
import com.javawebapp.admin.exception.ErrorTypes
import com.javawebapp.admin.repository.AnnouncementRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.time.ZonedDateTime

@Service
class AnnouncementService(
        private val announcementRepository: AnnouncementRepository
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
        announcementRepository.insert(announcement)
    }

    fun updateAnnouncementById(announcement: Announcement) {
        announcement.updateAnnouncementMetadata()
        announcementRepository.save(announcement)
    }

    @Scheduled(fixedDelay = 500000L)
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

    @Scheduled(fixedDelay = 5000L)
    fun sendMessageToWebSocket() {
        System.out.println("Sending Message")
        val restTemplate = RestTemplate()
        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON
        val announcement = Announcement("asdasd", "stastsa", "asdasdas", "asdasdasd", "asdasda", ZonedDateTime.now(), ZonedDateTime.now(), ZonedDateTime.now(), null, null, true)
        restTemplate.postForEntity('/')
    }
}