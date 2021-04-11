import React, { useContext, useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import MenuRoomList from './MenuRoomList';

import {UserIdContext} from "./contexts/ContextFile";

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  useEffect(() => {}, []);


  let { userId } = useContext(UserIdContext);

 let [roomToRepublish, setRoomToRepublish] = useState([])
    // console.log(roomToRepublish)


  const getRoomToRepublish = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    let res = await axios
      .get("https://helping-neighbours.herokuapp.com/republishroom/", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (response) => {
          // console.log(response.data.length);
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
      getRoomToRepublish()
  };


 



  const handleClose = () => {
    setAnchorEl(null);
  };


  const getUserRoomToRepublish = ()=> {
      // eslint-disable-next-line array-callback-return
      let repRoom =  roomToRepublish.map(room => {
        if (room.receiver_id === userId || room.sender_id === userId) {
            // console.log(room.name)
            return (
                   <div key={room.id} style={{ display: "flex" }}>
                        <MenuRoomList  rooms={room} />
                   </div>
            )
         }
      })
      return repRoom
  }

    

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
