package de.vkb.laser.chat

import de.vkb.laser.chat.model.*
import io.micronaut.websocket.WebSocketBroadcaster
import io.micronaut.websocket.WebSocketSession
import jakarta.inject.Singleton
import kotlin.Error

@Singleton
class ChatService(
    private val broadcaster: WebSocketBroadcaster
) {

    fun opened(session: WebSocketSession) {
        println("[${session.id}] opened")
    }

    fun closed(session: WebSocketSession) {
        println("[${session.id}] closed")
    }

    fun received(session: WebSocketSession, input: InputMessage) {
        when (input) {
            is Introduction -> {
                if (session.attributes.contains("USER")) {
                    session.sendSync(Error("session already has name ${session.attributes.get("USER", String::class.java)}"))
                } else {
                    session.attributes.put("USER", input.name)
                    println("[${session.id}] introduced as ${input.name}")
                    session.sendSync(Greeting("Hello ${input.name}"))
                }
            }
            is BroadcastMessage -> {
                session.attributes.get("USER", String::class.java)
                    .ifPresentOrElse({ user ->
                        println("[${session.id}] shouts: ${input.message}")
                        broadcaster.broadcastSync(Message(from = user, message = input.message))
                    }, {
                        println("[${session.id}] tries to say something anonymously")
                        session.sendSync(Error("introduce yourself first"))
                    })
            }
            is PrivateMessage -> {
                session.attributes.get("USER", String::class.java)
                    .ifPresentOrElse({ user ->
                        println("[${session.id}] whispers to ${input.to}: ${input.message}")
                        broadcaster.broadcastSync(Message(from = user, message = input.message)) { s ->
                            s.attributes.get(
                                "USER",
                                String::class.java
                            ).map { it == input.to }.orElse(false)
                        }
                    }, {
                        println("[${session.id}] tries to say something anonymously")
                        session.sendSync(Error("introduce yourself first"))
                    })
            }
        }
    }
}
