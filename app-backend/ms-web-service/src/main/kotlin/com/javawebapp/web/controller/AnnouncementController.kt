package com.javawebapp.web.controller

import com.javawebapp.web.entity.Announcement
import com.javawebapp.web.service.AnnouncementService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/announcements")
class AnnouncementController(
        private val announcementService: AnnouncementService
) {
    @GetMapping("/latest")
    fun getLatestAnnouncement(): ResponseEntity<List<Announcement>> {
        val announcements = announcementService.getLatestAnnouncements()
        return ResponseEntity(announcements, HttpStatus.OK)
    }

    @GetMapping("/all")
    fun getAllAnnouncements(): ResponseEntity<List<Announcement>> {
        val announcements = announcementService.getAllAnnouncements()
        return ResponseEntity(announcements, HttpStatus.OK)
    }

    @GetMapping("/all/page")
    fun getAllAnnouncementByPage(@RequestParam(name = "limit") limit: String, @RequestParam(name = "offset") offset: String): ResponseEntity<List<Announcement>> {
        val announcements = announcementService.getAnnouncementsByPagination(limit.toInt(), offset.toInt())
        return ResponseEntity(announcements, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    fun getAnnouncement(@PathVariable("id") id: String): ResponseEntity<Announcement> {
        val announcement = announcementService.getAnnouncementById(id)
        return ResponseEntity(announcement, HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteAnnouncement(@PathVariable("id") id: String): ResponseEntity<Void> {
        announcementService.deleteAnnouncementById(id)
        return ResponseEntity.noContent().build() // returns HTTP Status Code: 204
    }

    @PutMapping("/{id}")
    fun updateAnnouncement(@PathVariable("id") id: String, @RequestBody announcement: Announcement): ResponseEntity<Void> {
        announcementService.updateAnnouncementById(announcement)
        return ResponseEntity.noContent().build() // returns HTTP Status Code: 204
    }

    @PostMapping("/new")
    fun createNewAnnouncement(@RequestBody announcement: Announcement): ResponseEntity<Void> {
        announcementService.createNewAnnouncement(announcement)
        return ResponseEntity.noContent().build() // returns HTTP Status Code: 204
    }
}