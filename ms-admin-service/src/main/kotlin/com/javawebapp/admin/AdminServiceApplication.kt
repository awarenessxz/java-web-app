package com.javawebapp.admin

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AdminServiceApplication

fun main(args: Array<String>) {
	runApplication<AdminServiceApplication>(*args)
}
