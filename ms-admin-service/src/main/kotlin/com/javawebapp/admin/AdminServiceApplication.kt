package com.javawebapp.admin

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching

@SpringBootApplication
class AdminServiceApplication

fun main(args: Array<String>) {
	runApplication<AdminServiceApplication>(*args)
}
