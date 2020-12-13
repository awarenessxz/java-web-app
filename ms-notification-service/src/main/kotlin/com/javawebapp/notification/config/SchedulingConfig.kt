package com.javawebapp.notification.config

import com.javawebapp.notification.model.Testing
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled

@EnableScheduling
@Configuration
class SchedulingConfig(
        val template: SimpMessagingTemplate
) {

    @Scheduled(fixedDelay = 5000)
    fun sendAdhocMessages() {
        template.convertAndSend("/topic/announcements", Testing("Scheduled Message"))
    }
}