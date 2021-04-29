import React, { useContext, useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { UserIdContext } from "../components/contexts/ContextFile";
import axios from "axios";
import MenuList from "./MenuList";

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  useEffect(() => {}, []);

  let { userId } = useContext(UserIdContext);
  let [requestToRepublish, setRequestToRepublish] = useState([]);

  // request greater that 24hrs, are not fulfilled and have less than 5 volunteers
  const getAllRequestToRepublish = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    let res = await axios
      .get("https://helping-neighboors.herokuapp.com/republish/", {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (response) => {
          //   console.log(response.data);
          let uniqueReq = response.data.filter(
            (item) => item.user_id === userId
          );
          // console.log(uniqueReq);

          setRequestToRepublish(uniqueReq);
          return uniqueReq;
        }
      );

    return res;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    getAllRequestToRepublish();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderRequestToPublish = () => {
    return <MenuList requests={requestToRepublish} />;
  };

  return (
    <>
      <p
        className="pr-5 block md:inline uppercase my-3 md:my-0 cursor-pointer"
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Republish Request
      </p>
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
        {renderRequestToPublish()}
      </Menu>
    </>
  );
}
