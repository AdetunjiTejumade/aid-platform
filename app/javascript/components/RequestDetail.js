import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./App";
import axios from "axios";

function RequestDetail() {
  const csrf = document.querySelector('meta[name="csrf-token"]').content;
  const { state, dispatch } = React.useContext(AuthContext);
  const userId = state.currentUser.id;
  const volunteers = state.allVolunteers;
  const allRooms = state.allRooms;
  console.log(state);
  const [request, setRequest] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const { requestId } = useParams();
  const url = `https://helping-neighbours.herokuapp.com/requests/${requestId}/`;
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
      .then((result) => {
        setRequest(result.data);
        let userId = result.data.user_id;
        console.log(result.data);
        return userId;
      })
      .catch((error) => console.log(error));

    //console.log(request);
  }, []);
  return (
    <div className="flex">
      <div>
        <h1 className="font-bold text-xl">Title</h1>
        <p>{request.title}</p>
        <h1 className="font-bold text-xl">Description</h1>
        <p>{request.description}</p>
        <h1 className="font-bold text-xl">Address</h1>
        <p>{request.address}</p>
        <h1 className="font-bold text-xl">Status</h1>
        <p>{String(request.fulfilled)} hello</p>
        <div>
          <button className="border-black border-2 border-solid">
            Volunteer
          </button>
        </div>
      </div>

      <div>
          
      </div>
    </div>
  );
}
export default RequestDetail;
