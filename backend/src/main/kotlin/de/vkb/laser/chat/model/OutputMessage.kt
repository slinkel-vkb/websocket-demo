package de.vkb.laser.chat.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo
import com.fasterxml.jackson.annotation.JsonTypeName

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes(
    JsonSubTypes.Type(value = Error::class, name = "error"),
    JsonSubTypes.Type(value = Greeting::class, name = "greeting"),
    JsonSubTypes.Type(value = Message::class, name = "message")
)
interface OutputMessage {
}

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeName("error")
data class Error(
    val message: String
): OutputMessage

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeName("greeting")
data class Greeting(
    val message: String
): OutputMessage

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeName("message")
data class Message(
    val from: String,
    val message: String
): OutputMessage