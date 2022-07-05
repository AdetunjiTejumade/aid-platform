import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./App";
import axios from "axios";

function RequestDetail() {
  const { state, dispatch } = React.useContext(AuthContext);
  const [request, setRequest] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const csrf = document.querySelector('meta[name="csrf-token"]').content;
  const { requestId } = useParams();
  const url = `http://127.0.0.1:3000/requests/${requestId}`;
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

      <div></div>
    </div>
  );
}
export default RequestDetail;
