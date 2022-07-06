import React, { useContext } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { AllRoomContext } from "./contexts/ContextFile";
import axios from "axios";

export default function MenuRoomItem({ room }) {
  let { allRooms, setAllRooms } = useContext(AllRoomContext);
  //  console.log(room)
  //  console.log(allRooms)

export default function MenuRoomItem({room}) {
  const csrf = document.querySelector('meta[name="csrf-token"]').content;
    let {allRooms, setAllRooms } = useContext(AllRoomContext)
        //  console.log(room)
        //  console.log(allRooms)

    let obj = {
      patched: pathchedValue,
    };

    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    let res = axios
      .patch(
        `http://127.0.0.1:3000/conversations/${room.id}`,
        obj,
        {
          headers: {
            "X-CSRF-Token": csrf,
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then(
        (response) => {
          //  console.log("success", response.data);
          let tempRoom = [response.data, ...allRooms];
          setAllRooms(tempRoom);
          alert("Room Republished");
        },
        (error) => {
          //  console.log("Error", error);
        }
      );

       let res = axios
         .patch(`https://helping-neighbours.herokuapp.com/conversations/${room.id}/`, obj, {
           headers: {
            "X-CSRF-Token": csrf,
             Authorization: `Basic ${token}`,
           },
         })
         .then(
           (response) => {
             //  console.log("success", response.data);
             let tempRoom = [response.data, ...allRooms];
             setAllRooms(tempRoom);
             alert("Room Republished");
           },
           (error) => {
             //  console.log("Error", error);
           }
         );

  return (
    <MenuItem key={room.id} selected={room[0]} onClick={handleRoomDetails}>
      {room.name}
    </MenuItem>
  );
}
