import React, { useContext } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { AllRequestContext } from "../components/contexts/ContextFile";

export default function MenuItems({ request }) {
  const { allRequest, setAllRequest } = useContext(AllRequestContext);

  const handleRequestDetails = () => {
    // alert("i did it");
    //  console.log(request)
    //  requestToRepublish(request.id)
    let rType =
      request.request_type === "material-need"
        ? `one-time-task`
        : `material-need`;
    let obj = {
      request_type: rType,
    };

    const token = JSON.parse(localStorage.getItem("token"));

    let res = axios
      .patch(`http://localhost:3000/requests/${request.id}`, obj, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (response) => {
          //  console.log("success", response.data);

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
      key={request.id}
      selected={request[0]}
      onClick={handleRequestDetails}
    >
      {request.description}
    </MenuItem>
  );
}
