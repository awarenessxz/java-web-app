package com.javawebapp.admin.controller

import com.javawebapp.admin.entity.Announcement
import com.javawebapp.admin.repository.AnnouncementRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/announcements")
class AnnouncementController(
        private val announcementRepository: AnnouncementRepository
) {

    @GetMapping("/latest")
    fun getLatestAnnouncement(): String {
        return "Latest"
    }

    @GetMapping("/all")
    fun getAllAnnouncements(): List<Announcement> {
        return announcementRepository.findAll()
    }
}