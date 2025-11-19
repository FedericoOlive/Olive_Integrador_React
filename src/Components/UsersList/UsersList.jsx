import React from "react";
import {GetAvatarUrl} from "../../Utils/Utils.js";
import "./UsersList.css";

export function UsersList({users = [], idFrom, idTo, onSelectUser})
{
    const currentUser = users.find(user => user.id == idFrom);
    const otherUsers = users.filter(user => user.id != idFrom);
    
    return (
        <div>
            <ul className = "userlist">
                {
                    currentUser && (
                        <li
                            key = {currentUser.id}
                            className = "userlist-item selected"
                        >
                            <img
                                src = {GetAvatarUrl(currentUser.id)}
                                alt = "avatar"
                                className = "user-avatar"
                            />
                            {currentUser.name}
                        </li>
                    )
                }
            </ul>
            <hr/>
            <ul className = "userlist">
                {
                    otherUsers.map(user => (
                        <li
                            key = {user.id}
                            className = {`userlist-item ${idTo == user.id ? "selected" : ""}`}
                            onClick = {() => onSelectUser(user.id)}
                        >
                            <img
                                src = {GetAvatarUrl(user.id)}
                                alt = "avatar"
                                className = "user-avatar"
                            />
                            {user.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}