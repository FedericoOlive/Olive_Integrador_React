import React from "react";
import "./ChatBox.css";

export function ChatBox({ chatBoxRef, messages, idFrom, idTo, formatTimestamp })
{
    return (
        <div ref = {chatBoxRef} className = "chat-box">
            {messages.length === 0 && idFrom && idTo && (
                <p className = "chat-empty">No hay mensajes. ¡Empieza la conversación!</p>
            )}

            {
                messages.map((msg) => (
                    <div
                        key = {msg.id}
                        className = {`chat-message-container ${
                            msg.idFrom === idFrom ? "sent" : "received"
                        }`}
                    >
                        <div
                            className = {`chat-bubble ${
                                msg.idFrom === idFrom ? "bubble-sent" : "bubble-received"
                            }`}
                        >
                            <p>{msg.message}</p>
                            <span className = "chat-timestamp">
                              {formatTimestamp(msg.date)}
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}