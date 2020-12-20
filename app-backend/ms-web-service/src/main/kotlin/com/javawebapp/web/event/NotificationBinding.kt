package com.javawebapp.web.event

import org.springframework.cloud.stream.annotation.Output
import org.springframework.messaging.MessageChannel

// create an exchange
interface NotificationBinding {

    // publish message to channel (AKA exchange in rabbitMQ concept)
    @Output(NEW_NOTIFICATION_CHANNEL)
    fun outboundNotificationChannel(): MessageChannel

    companion object {
        const val NEW_NOTIFICATION_CHANNEL = "newNotificationChannel"
    }
}