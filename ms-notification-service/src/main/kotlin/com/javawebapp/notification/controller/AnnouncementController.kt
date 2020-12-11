package com.javawebapp.notification.controller

import com.javawebapp.notification.model.Testing
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller

@Controller
class AnnouncementController {

    @MessageMapping("/announcements") // client get this
    @SendTo("/topic/announcements") // client listening to /topic/announcements
    fun getAnnouncement(something: String): Testing {
        System.out.println("Recevied: $something")
        return Testing("Received: $something")
    }
}
