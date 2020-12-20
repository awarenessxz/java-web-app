package com.javawebapp.notification.event

data class EventPayloadModel(
        val type: EventType,
        val content: Any
)