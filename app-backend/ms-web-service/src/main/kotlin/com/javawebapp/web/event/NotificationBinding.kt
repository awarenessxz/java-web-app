package com.javawebapp.web.event

import org.springframework.cloud.stream.annotation.Output
import org.springframework.messaging.MessageChannel

// create an exchange
interface NotificationBinding {
    @Output("newNotificationChannel")
    fun newNotification(): MessageChannel
}