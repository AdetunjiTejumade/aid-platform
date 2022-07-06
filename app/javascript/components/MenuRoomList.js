import React from "react";
import MenuRoomItem from "./MenuRoomItem";

export default function MenuRoomList({ rooms }) {
  // console.log(typeof rooms)
  const renderRooms = () => {
    return <MenuRoomItem room={rooms} />;
  };

  return (
    <div>

      {renderRooms()}
    </div>
  );
}
