import React, { useContext, useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import axios from "axios";
import MenuRoomList from "./MenuRoomList";

import { UserIdContext } from "./contexts/ContextFile";

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  useEffect(() => {}, []);

  let { userId } = useContext(UserIdContext);

  let [roomToRepublish, setRoomToRepublish] = useState([]);

  const getRoomToRepublish = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    let res = await axios
      .get("https://helping-neighboors.herokuapp.com/republishroom", {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (response) => {
          setRoomToRepublish(response.data);
        },
        (error) => {
          // console.log(error);
        }
      );

    return res;
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    getRoomToRepublish();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserRoomToRepublish = () => {
    let repRoom = roomToRepublish.map((room) => {
      if (room.receiver_id === userId || room.sender_id === userId) {
        return (
          <div key={room.id} style={{ display: "flex" }}>
            <MenuRoomList rooms={room} />
          </div>
        );
      }
    });
    return repRoom;
  };

  return (
    <>
      <Button
        variant="contained"
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
      >
        Republish Room
      </Button>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "350px",
          },
        }}
      >
        {getUserRoomToRepublish()}
      </Menu>
    </>
  );
}
