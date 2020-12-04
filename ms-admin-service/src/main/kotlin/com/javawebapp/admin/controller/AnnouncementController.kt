package com.javawebapp.admin.controller

import com.javawebapp.admin.entity.Announcement
import com.javawebapp.admin.service.AnnouncementService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/announcements")
class AnnouncementController(
        private val announcementService: AnnouncementService
) {
    @GetMapping("/latest")
    fun getLatestAnnouncement(): String {
        return "Latest"
    }

    @GetMapping("/all")
    fun getAllAnnouncements(@RequestParam(required = false, name = "limit") limit: String?, @RequestParam(required = false, name = "offset") offset: String?): ResponseEntity<List<Announcement>> {
        return if (limit !== null && offset !== null) {
            // partial fetch based on limit (amount) & offset (position)
            System.out.println("Announcements partial")
            val announcements = announcementService.getAllAnnouncements()
            ResponseEntity(announcements, HttpStatus.OK)
        } else {
            // full fetch
            System.out.println("Announcements full")
            val announcements = announcementService.getAllAnnouncements()
            ResponseEntity(announcements, HttpStatus.OK)
        }
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
        System.out.println("received ==> $announcement");
        announcementService.createNewAnnouncement(announcement)
        return ResponseEntity.noContent().build() // returns HTTP Status Code: 204
    }
}