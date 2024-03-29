package com.javawebapp.web

import com.javawebapp.web.event.NotificationBinding
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.stream.annotation.EnableBinding

@EnableBinding(NotificationBinding::class)
@SpringBootApplication
class WebServiceApplication

fun main(args: Array<String>) {
	runApplication<WebServiceApplication>(*args)
}
