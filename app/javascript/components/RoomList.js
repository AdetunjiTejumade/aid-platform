import React, { useContext, useEffect } from "react";
import RoomItem from "./RoomItem";
import { UserIdContext, AllVolunteerContext } from "./contexts/ContextFile";

export default function RoomList({ allRooms, requiresRepublishing }) {
  useEffect(() => {}, []);

  let { userId } = useContext(UserIdContext);

  let { allVolunteers } = useContext(AllVolunteerContext);

  const renderRooms = () => {
    let allRoom = allRooms.map((room, i, a) => {
      if (room.receiver_id === userId || room.sender_id === userId) {
        return (
          <div key={room.id} style={{ display: "flex" }}>
            <RoomItem allVolunteers={allVolunteers} room={room} />
          </div>
        );
      }
    });
    return allRoom;
  };

  return <div>{renderRooms()}</div>;
}
