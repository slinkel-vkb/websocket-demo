package de.vkb.laser.chat

import de.vkb.laser.chat.model.InputMessage
import io.micronaut.websocket.WebSocketSession
import io.micronaut.websocket.annotation.OnClose
import io.micronaut.websocket.annotation.OnMessage
import io.micronaut.websocket.annotation.OnOpen
import io.micronaut.websocket.annotation.ServerWebSocket

@ServerWebSocket("/chat")
class ChatController(
    private val chatService: ChatService
) {

    @OnOpen
    fun onOpen(session: WebSocketSession) {
        chatService.opened(session)
    }

    @OnMessage
    fun onMessage(message: InputMessage, session: WebSocketSession) {
        chatService.received(session, message)
    }

    @OnClose
    fun onClose(session: WebSocketSession) {
        chatService.closed(session)
    }
}