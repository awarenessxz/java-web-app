package com.javawebapp.web.event

data class EventPayloadModel(
        val type: EventType,
        val content: Any
)