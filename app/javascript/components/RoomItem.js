import React, { useEffect, useContext } from "react";
import axios from "axios";
import {
  RoomDataContext,
  AllRequestContext,
  SelectedRequestContext,
  CurrentVolunteerContext,
  RepublishingContext,
} from "./contexts/ContextFile";
import { Link } from "react-router-dom";
import ChatIcon from '@material-ui/icons/Chat';
import { grey } from "@material-ui/core/colors";

export default function RoomItem({ room, allVolunteers }) {
  useEffect(() => {}, []);

  let { setRequiresRepublishing } = useContext(RepublishingContext);

  let { currentRoom, setCurrentRoom } = useContext(RoomDataContext);
  let { allRequest } = useContext(AllRequestContext);
  const { selectedRequest, setSelectedRequest } = useContext(
    SelectedRequestContext
  );

  let { setCurrentVol } = useContext(CurrentVolunteerContext);

  const getRoomData = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    let res = await axios
      .get(`https://helping-neighboors.herokuapp.com/conversations/${id}`, {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (result) => {

          setCurrentRoom({
            room: result.data,
            messages: result.data.messages,
            users: result.data.users,
          });
        },
        (error) => {
          // console.log(error);
        }
      );

    return res;
  };

  const handleClick = () => {
    getRoomData(room.id || currentRoom.room.id);
    console.log(currentRoom.room);
    const getReq = allRequest.find((req) => req.description === room.name);

    setSelectedRequest(getReq);
    if (!getReq) {
      alert("The owner of this request has to republish it");
      setRequiresRepublishing(true);
    } else {
      getDesiredVolunteer(getReq);

      return getReq;
    }
  };

  const getDesiredVolunteer = (arr) => {
    const vol = allVolunteers.find(
      (vol) => vol.request_id === arr.id && room.sender_id === vol.user_id
    );
    setCurrentVol(vol);
  };

  return (
    <>
    <Link to={`/rooms/${room.id || currentRoom.room.id}`} onClick={handleClick} className="mb-3">
      {room.name} <ChatIcon style={{ color: grey[500] }} />
    </Link>
    <hr />
    </>
  );
}
