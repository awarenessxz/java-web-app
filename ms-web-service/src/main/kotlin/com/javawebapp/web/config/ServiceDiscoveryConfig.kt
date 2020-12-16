package com.javawebapp.web.config

import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.cloud.client.loadbalancer.LoadBalanced
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate
import java.time.Duration

@Configuration
class ServiceDiscoveryConfig {
    @Bean
    @LoadBalanced
    fun template(): RestTemplate = RestTemplateBuilder()
            .setReadTimeout(Duration.ofMillis(100))
            .setConnectTimeout(Duration.ofMillis(100))
            .build()
}
