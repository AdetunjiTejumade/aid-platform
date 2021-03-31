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

    let res = await axios
      .get("http://localhost:3000/republish/", {
        headers: {
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
        },
        (error) => {
          // console.log(error);
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
      <Button
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <a
        // variant="contained" color="primary"
        >
          Republish Request
        </a>
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
        {renderRequestToPublish()}
      </Menu>
    </>
  );
}
