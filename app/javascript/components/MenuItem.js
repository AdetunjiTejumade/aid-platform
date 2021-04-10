import React, { useContext } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { AllRequestContext } from "../components/contexts/ContextFile";

const MenuItems = React.forwardRef(({ request }, ref) => {
  const { allRequest, setAllRequest } = useContext(AllRequestContext);

  const handleRequestDetails = () => {
    // alert("i did it");
    //  console.log(request)
    //  requestToRepublish(request.id)
    let rType =
      request.request_type === "material_need"
        ? `one_time_task`
        : `material_need`;
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
      // {...props}
      ref={ref}
      key={request.id}
      selected={request[0]}
      onClick={handleRequestDetails}
    >
      {request.description}
    </MenuItem>
  );

})

export default MenuItems;