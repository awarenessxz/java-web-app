package com.javawebapp.notification.event

import org.springframework.cloud.stream.annotation.Input
import org.springframework.messaging.SubscribableChannel

interface NotificationBinding {

    // listening to notificationChannel
    @Input(NEW_NOTIFICATION_CHANNEL)
    fun inboundNotificationChannel(): SubscribableChannel

    companion object {
        const val NEW_NOTIFICATION_CHANNEL = "newNotificationChannel"
    }
}