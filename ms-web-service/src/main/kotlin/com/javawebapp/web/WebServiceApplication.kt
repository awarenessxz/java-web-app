package com.javawebapp.web

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient

@SpringBootApplication
@EnableDiscoveryClient
class AdminServiceApplication

fun main(args: Array<String>) {
	runApplication<AdminServiceApplication>(*args)
}
