package com.javawebapp.notification.event

import org.springframework.cloud.stream.annotation.EnableBinding
import org.springframework.cloud.stream.annotation.StreamListener
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.simp.SimpMessagingTemplate

@EnableBinding(NotificationProcessor::class)
class EventStreamListener(
        private val template: SimpMessagingTemplate
) {

    /*
    @StreamListener(target = "inboundNotificationChannel")
    fun listenToNotificationEvent() {

    }
     */

}