import React from "react";
import "./InputFieldHeaderIds.css";

export default function InputFieldHeaderIds({nameFrom, nameTo, callbackUsersButton})
{
    return (
        <div className = "chat-header-inputs">
            {nameFrom} to {nameTo}

            <button
                className = "toggle-users-btn"
                onClick = {callbackUsersButton}
            >
                |||
            </button>
        </div>
    );
}