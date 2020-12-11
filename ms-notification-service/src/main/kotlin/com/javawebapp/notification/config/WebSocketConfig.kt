package com.javawebapp.notification.config

import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.config.annotation.StompEndpointRegistry
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor

@Configuration
@EnableWebSocketMessageBroker
class WebSocketConfig: AbstractWebSocketMessageBrokerConfigurer() {
    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        registry.addEndpoint("/stomp")
                .withSockJS()
                //.setInterceptors(stompHttpSessionIdHandshakeInterceptor())
    }

    override fun configureMessageBroker(registry: MessageBrokerRegistry) {
        // prefix for outgoing Websocket communication to subscribers
        registry.enableSimpleBroker("/topic")
        // prefix for client to send to server
        registry.setApplicationDestinationPrefixes("/app")
    }

    fun stompHttpSessionIdHandshakeInterceptor(): HttpSessionHandshakeInterceptor {
        return HttpSessionHandshakeInterceptor()
    }
}