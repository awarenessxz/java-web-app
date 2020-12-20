package com.javawebapp.notification.controller

import org.springframework.stereotype.Controller
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
}
