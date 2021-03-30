import React from "react";
import { Link } from "react-router-dom";

function Rooms(props) {
  const displayRooms = (rooms) => {
    let usersRooms = null;
    // console.log(props.currentUser);
    if (props.currentUser) {
      usersRooms = props.currentUser.conversations
    }
    return rooms.map((room) => {
      const { name, description } = room.users;
      console.log(room.users);
      return (
        <div key={room.id}>
          <h3>{name}</h3>
          <p>{description}</p>
          {usersRooms &&
          usersRooms.some((userRoom) => userRoom.id === parseInt(room.id)) ? (
            <Link to={`/rooms/${room.id}`}>
              <button>Enter</button>
            </Link>
          ) : (
            <Link to={`/rooms/${room.id}`}>
              <button id={room.id} onClick={props.handleSubscribe}>
                Subscribe
              </button>
            </Link>
          )}
        </div>
      );
    });
  };
  return (
    <div>
      <h1>Current Rooms</h1>
      {displayRooms(props.allRooms)}
    </div>
  );
}
export default Rooms;
