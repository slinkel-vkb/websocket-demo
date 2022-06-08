package de.vkb.laser.chat.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo
import com.fasterxml.jackson.annotation.JsonTypeName

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes(
    JsonSubTypes.Type(value = Introduction::class, name = "introduction"),
    JsonSubTypes.Type(value = BroadcastMessage::class, name = "broadcast-message"),
    JsonSubTypes.Type(value = PrivateMessage::class, name = "private-message")
)
interface InputMessage {
}

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeName("introduction")
data class Introduction(
    val name: String
): InputMessage

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeName("broadcast-message")
data class BroadcastMessage(
    val message: String
): InputMessage

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeName("private-message")
data class PrivateMessage(
    val to: String,
    val message: String
): InputMessage