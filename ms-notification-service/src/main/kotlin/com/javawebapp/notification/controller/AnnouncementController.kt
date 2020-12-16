package com.javawebapp.notification.controller

import com.javawebapp.notification.model.Announcement
import org.springframework.http.ResponseEntity
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.messaging.simp.SimpMessagingTemplate

@Controller
class AnnouncementController(
        private val template: SimpMessagingTemplate
) {
    /*
    @MessageMapping("/announcements") // client get this
    @SendTo("/topic/announcements") // client listening to /topic/announcements
    fun getAnnouncement(announcement: Announcement): String {
        System.out.println("AAAAA Recevied $announcement")
        return "Sometihng"
    }*/

    @RequestMapping("/publish/announcement")
    fun publishNewAnnouncement(@RequestBody announcement: Announcement): ResponseEntity<Void> {
        // receive rest call from other microservice and publish into websocket topic
        template.convertAndSend("/topic/announcement/new", announcement)
        return ResponseEntity.noContent().build() // returns HTTP Status Code: 204
    }
}
