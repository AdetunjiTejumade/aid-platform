import React, { useEffect } from "react";

function RoomWebSocket(props) {
  useEffect(() => {
    props.getRoomData(window.location.href.match(/\d+$/)[0]);
    props.cableApp.room = props.cableApp.cable.subscriptions.create(
      {
        channel: "RoomsChannel",
        room: window.location.href.match(/\d+$/)[0],
      },
      {
        received: (updatedRoom) => {
          props.updateApp(updatedRoom);
        },
      }
    );
  }, []);

  return <div></div>;
}

export default RoomWebSocket;