package com.javawebapp.notification.event

import org.springframework.cloud.stream.annotation.EnableBinding
import org.springframework.cloud.stream.annotation.StreamListener
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.simp.SimpMessagingTemplate

@EnableBinding(NotificationBinding::class)
class EventStreamListener(
        private val template: SimpMessagingTemplate
) {
    // TO-DO: Add Error Handling
    @StreamListener(target = NotificationBinding.NEW_NOTIFICATION_CHANNEL)
    fun listenToNotificationChannelEvent(@Payload event: EventPayloadModel) {
        when (event.type) {
            EventType.NEW_ANNOUNCEMENT -> {
                // receive announcement from web-service and publish into websocket topic
                val announcement = event.content
                template.convertAndSend("/topic/announcement/new", announcement)
            }
        }
    }
}