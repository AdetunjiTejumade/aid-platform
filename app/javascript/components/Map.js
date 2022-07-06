import React, { useState, useContext } from "react";
import {
  UserLatContext,
  UserLngContext,
  AllRequestContext,
  UserIdContext,
  RequestOwnerContext,
  ReqOwnerFirstNameContext,
  SelectedReqDescContext,
  AllRoomContext,
  RequestOwnerIdContext,
  ChatRoomIdContext,
  SelectedRequestContext,
  CurrentVolunteerContext,
} from "../components/contexts/ContextFile";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Footer from "./pages/Footer";
function Map() {
  const { userLat } = useContext(UserLatContext);
  const { userLng } = useContext(UserLngContext);
  const { allRequest } = useContext(AllRequestContext);
  const { userId } = useContext(UserIdContext);

  const url = "http://127.0.0.1:3000/requests/";

  let history = useHistory();

  const { selectedRequest, setSelectedRequest } = useContext(
    SelectedRequestContext
  );

  const { requestOwner, setRequestOwner } = useContext(RequestOwnerContext);
  const { reqOwnerFirstName, setReqOwnerFirstName } = useContext(
    ReqOwnerFirstNameContext
  );

  let [sameUserClick, setSameUserClick] = useState(null);
  let { setCurrentVol } = useContext(CurrentVolunteerContext);

  const [requestId, setRequestId] = useState(null);

  let { reqDescription, setReqDescription } = useContext(
    SelectedReqDescContext
  );
  let { allRooms, setAllRooms } = useContext(AllRoomContext);

  let { setChatReceiverId } = useContext(RequestOwnerIdContext);

  let { setChatRoomId } = useContext(ChatRoomIdContext);

  const onCreateRoom = async () => {
    let roomObj = {
      name: reqDescription,
      sender_id: userId,
      receiver_id: requestOwner,
      request_id: requestId,
    };

    let tempArray = [roomObj, ...allRooms];

    const token = JSON.parse(localStorage.getItem("token"));

    let res = axios
      .post("https://helping-neighbours.herokuapp.com/conversations/", roomObj, {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (response) => {
          onRequestRoomCreate(response.data.id);

          setChatRoomId(response.data.id);
          history.push(`rooms/${response.data.id}`);

          setAllRooms(tempArray);
        },
        (error) => {
          // console.log("Error", error);
        }
      );

    return res;
  };

  const onVolunteerClick = async () => {
    setChatReceiverId(requestOwner);

    const data = {
      request_id: requestId,
      user_id: userId,
    };
    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    const res = await axios
<<<<<<< HEAD
      .post("https://helping-neighbours.herokuapp.com/requests_users/", data, {
=======
      .post("http://127.0.0.1:3000/requests_users", data, {
>>>>>>> main
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (response) => {
          setCurrentVol(response.data);
        },
        (error) => {
          // console.log(error);
        }
      );

    onCreateRoom();

    return res;
  };

  const onRequestRoomCreate = async (chatroomId) => {
    const data = {
      request_id: requestId,
      room_id: chatroomId,
    };

    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    const res = await axios
<<<<<<< HEAD
      .post("https://helping-neighbours.herokuapp.com/requests_rooms/", data, {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
=======
      .post(
        "http://127.0.0.1:3000/requests_conversations",
        data,
        {
          headers: {
            "X-CSRF-Token": csrf,
            Authorization: `Basic ${token}`,
          },
        }
      )
>>>>>>> main
      .then(
        (response) => {
          // console.log(response.data);
        },
        (error) => {
          // console.log(error);
        }
      );

    return res;
  };

  const checkSameUserClick = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    let res = await axios
      .get(
<<<<<<< HEAD
        `https://helping-neighbours.herokuapp.com/samevolunteer/${id}/`,
=======
        `http://127.0.0.1:3000/samevolunteer/${id}`,
>>>>>>> main

        {
          headers: {
            "X-CSRF-Token": csrf,
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then(
        (response) => {
          setSameUserClick(response.data);
        },
        (error) => {
          //  console.log(error);
        }
      );
    getRequestOwner(requestOwner);

    return res;
  };
  const getRequestOwner = async (id) => {
    if (id) {
      const token = JSON.parse(localStorage.getItem("token"));
      const csrf = document.querySelector('meta[name="csrf-token"]').content;

      let res = await axios
<<<<<<< HEAD
        .get(`https://helping-neighbours.herokuapp.com/users/${id}/`, {
=======
        .get(`http://127.0.0.1:3000/users/${id}`, {
>>>>>>> main
          headers: {
            "X-CSRF-Token": csrf,
            Authorization: `Basic ${token}`,
          },
        })
        .then(
          (response) => {
            setChatReceiverId(response.data.id);
            setReqOwnerFirstName(response.data.first_name);
          },
          (error) => {
            console.log(error);
          }
        );
      return res;
    }
  };
  const renderButton = () => {
    if (userId === requestOwner) {
      return <p className="badge h3 badge-info">You own this request</p>;
    } else if (sameUserClick === true) {
      return <p className="badge h3 badge-info mr-3">Already Volunteered</p>;
    } else {
      return (
        <button onClick={onVolunteerClick} className="btn-sm btn-success">
          Volunteer
        </button>
      );
    }
  };

  return (
    <>
      <div className="h-full grid mx-6">
        <MapContainer
          center={[userLat, userLng]} // center to users current location
          zoom={6}
          className="w-full col-span-2"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {allRequest.map((items, index) => {
            const {
              id,
              title,
              description,
              lat,
              lng,
              request_type,
              fulfilled,
              user_id,
            } = items;

            if (fulfilled === false) {
              return (
                <Marker
                  onDomReady={checkSameUserClick(id)}
                  eventHandlers={{
                    click: (e) => {
                      setSelectedRequest(items);
                      setRequestId(id);

                      setRequestOwner(user_id);
                      setReqDescription(description);
                    },
                  }}
                  position={[lat, lng]}
                  key={index}
                >
                  {selectedRequest && (
                    <Popup className="request-popup rounded">
                      <div>
                        <h1 className="text-xl font-bold capitalize">
                          {title}
                        </h1>
                        <p>{description}</p>
                        <p>{request_type}</p>
                        <div className="text-right">{renderButton()}</div>
                      </div>
                    </Popup>
                  )}
                </Marker>
              );
            }
          })}
        </MapContainer>
      </div>
      <>
        <Footer />
      </>
    </>
  );
}
export default Map;
