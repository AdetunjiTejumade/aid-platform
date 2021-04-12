import React, { useContext, useEffect } from "react";
import RoomItem from "./RoomItem";
import { UserIdContext, AllVolunteerContext } from "./contexts/ContextFile";

export default function RoomList({ allRooms, requiresRepublishing }) {
  useEffect(() => {}, []);
  // console.log(roomToShow);
  let { userId } = useContext(UserIdContext);

  let { allVolunteers } = useContext(AllVolunteerContext);
  // console.log(allVolunteers)

  const renderRooms = () => {
    // eslint-disable-next-line array-callback-return
    let allRoom = allRooms.map((room, i, a) => {
      // console.log(a)
      if (room.receiver_id === userId || room.sender_id === userId) {
        //  console.log(room)
        return (
          <div key={room.id} style={{ display: "flex" }}>
            {/* Room {roomCount}:  &nbsp; &nbsp; */}
            <RoomItem allVolunteers={allVolunteers} room={room} />
          </div>
        );
      }
    });
    return allRoom;
  };

  return <div>{renderRooms()}</div>;
}
