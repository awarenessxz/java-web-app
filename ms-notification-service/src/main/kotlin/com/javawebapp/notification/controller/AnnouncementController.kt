package com.javawebapp.notification.controller

import com.javawebapp.notification.model.Announcement
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class AnnouncementController {
    @MessageMapping("/announcements") // client get this
    @SendTo("/topic/announcements") // client listening to /topic/announcements
    fun getAnnouncement(something: String): String {
        System.out.println("Recevied: $something")
        return "Sometihng"
    }

    @RequestMapping("/publish/announcement")
    fun publishNewAnnouncement() {
        System.out.println("Received Announcement")
    }
}
