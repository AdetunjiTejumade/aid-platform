import React, { useContext } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { AllRequestContext } from "../components/contexts/ContextFile";

const MenuItems = React.forwardRef(({ request }, ref) => {
  const { allRequest, setAllRequest } = useContext(AllRequestContext);

  const handleRequestDetails = () => {
    let rType =
      request.request_type === "material_need"
        ? `one_time_task`
        : `material_need`;
    let obj = {
      request_type: rType,
    };

    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    let res = axios
      .patch(
        `https://helping-neighboors.herokuapp.com/requests/${request.id}`,
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
          let tempRequest = [response.data, ...allRequest];
          setAllRequest(tempRequest);
          alert("Request Republished");
        },
        (error) => {
          //  console.log("Error", error);
        }
      );

    return res;
  };

  return (
    <MenuItem
      ref={ref}
      key={request.id}
      selected={request[0]}
      onClick={handleRequestDetails}
    >
      {request.description}
    </MenuItem>
  );
});

export default MenuItems;
