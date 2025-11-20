import React, {useEffect, useRef, useState} from 'react';
import {ListenAllUsers, RequestMessages, SendMessage} from '../../Services/FireBase/DataBase.js';
import {InputFieldMessage} from "../../Components/InputFieldMessage/InputFieldMessage.jsx";
import {UsersList} from "../../Components/UsersList/UsersList.jsx";
import {ChatBox} from "../../Components/ChatBox/ChatBox.jsx";
import {formatTimestamp} from '../../Utils/Utils.js';
import {useParams, useLocation, useNavigate} from "react-router-dom";
import HeaderIds from "../../Components/InputFieldHeaderIds/InputFieldHeaderIds.jsx";

import "./ChatScreen.css";

export default function ChatScreen()
{
    const {idFrom: idFrom, idTo: idTo} = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const initialUsers = location.state?.users || [];

    const [users, setUsers] = useState(initialUsers);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatBoxRef = useRef(null);
    const [showUsers, setShowUsers] = useState(false);

    if (isNaN(parseInt(idFrom)) || idTo !== undefined && isNaN(parseInt(idTo)))
        navigate("/");

    useEffect(() =>
              {
                  return ListenAllUsers(setUsers);
              }, []);

    useEffect(() =>
              {
                  if (!idFrom || !idTo)
                  {
                      setMessages([]);
                      return;
                  }

                  return RequestMessages(idFrom, idTo, setMessages);

              }, [idFrom, idTo]);

    useEffect(() =>
              {
                  if (chatBoxRef.current)
                  {
                      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
                  }
              }, [messages]);

    useEffect(() =>
              {
                  const media = window.matchMedia("(max-width: 800px)");
                  setShowUsers(!media.matches);
                  const listener = (e) =>
                  {
                      setShowUsers(!e.matches);
                  };
                  media.addEventListener("change", listener);
                  return () => media.removeEventListener("change", listener);
              }, []);

    const handleSendMessage = async (e) =>
    {
        e.preventDefault();

        if (newMessage.trim() === '' || !idFrom || !idTo)
            return;

        await SendMessage(idFrom, idTo, newMessage, setNewMessage);
    };

    return (
        <div className = "full-container">
            <div className = {`users-container ${showUsers ? "visible" : "invisible"}`}>
                <UsersList
                    users = {users}
                    idFrom = {idFrom}
                    idTo = {idTo}
                    onSelectUser = {(uId) => navigate(`/chat/${idFrom}/${uId}`, {state: {users}})}
                />
            </div>

            <div className = "chat-container">
                <header className = {`chat-header ${showUsers ? "visible" : "invisible"}`}>
                    <HeaderIds
                        nameFrom = {idFrom}
                        nameTo = {idTo}
                        callbackUsersButton = {() => setShowUsers(!showUsers)}
                    />
                </header>

                <ChatBox
                    chatBoxRef = {chatBoxRef}
                    messages = {messages}
                    idFrom = {idFrom}
                    idTo = {idTo}
                    formatTimestamp = {formatTimestamp}
                />

                <InputFieldMessage
                    onSubmit = {handleSendMessage}
                    value = {newMessage}
                    onChange = {(e) => setNewMessage(e.target.value)}
                    idFrom = {idFrom}
                    idTo = {idTo}
                />
            </div>
        </div>
    );
}