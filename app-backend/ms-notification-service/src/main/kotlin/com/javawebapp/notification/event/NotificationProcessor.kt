package com.javawebapp.notification.event

import org.springframework.cloud.stream.annotation.Input
import org.springframework.messaging.SubscribableChannel

interface NotificationProcessor {
    @Input
    fun inboundNotificationChannel(): SubscribableChannel
}