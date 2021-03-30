import axios from "axios";
import React, { useState } from "react";
import ChatFeed from './ChatFeed';
import RoomWebSocket from "./RoomWebSocket";

function RoomShow(props) {
  console.log(props.currentRoom);
  const [newMessage, setNewMessage] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const displayUsers = (users) => {
    return users.map((user) => {
      return <li key={user.id}>{user.username}</li>;
    });
  };
  const handleMessageInput = (event) => {
    setNewMessage(event.target.value);
  };

  const submitMessage = (event) => {
    setNewMessage("");

    const message = {
      content: newMessage,
      user_id: props.currentUser.id,
      room_id: props.roomData.room.id,
    };
    axios
      .post("http://localhost:3000/messages", message, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => res)
      .then((result) => {
        let messageDiv = document.getElementById("messages");
        messageDiv.scrollTop = messageDiv.scrollHeight;
      });
  };
  return (
    <div>
      {Object.keys(props.roomData.room).length > 0 ? (
        <div id="room-show">
          <h1 id="room-header">
            Welcome to the {props.roomData.room.name} Room!
          </h1>
          <div id="room-sidebar">
            <h3>Fellow {props.roomData.room.name}</h3>
            <ul id="users-list">
              {displayUsers(props.roomData.room.users.data)}
            </ul>
          </div>
          <ChatFeed
            room={props.roomData.room}
            currentUser={props.currentUser}
          />
          <form id="chat-form" onSubmit={submitMessage}>
            <h3>Post a new message:</h3>
            <textarea
              type="text"
              value={state.newMessage}
              onChange={handleMessageInput}
            ></textarea>
            <br></br>
            <input type="submit"></input>
          </form>
        </div>
      ) : null}

      <RoomWebSocket
        cableApp={props.cableApp}
        updateApp={props.updateApp}
        getRoomData={props.getRoomData}
        roomData={props.roomData}
      />
    </div>
  );
}
export default RoomShow;
