import React, { useState, useEffect, useContext } from "react";
import { AuthContext, RequestOwnerIdContext, RequestOwnerContext } from "./App";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import axios from "axios";

function Map({ allRooms }) {
  //console.log(allRooms);
  const { state, dispatch } = React.useContext(AuthContext);
  let { setChatReceiverId } = useContext(RequestOwnerIdContext);
  const { requestOwner, setRequestOwner } = useContext(RequestOwnerContext);
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [requestId, setRequestId] = useState(null);
  const [reqDescription, setReqDescription] = useState("");
  const [items, setItems] = useState([]);
  const url = "http://localhost:3000/requests/";
  //const header = JSON.parse(localStorage.getItem("header"));
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);
      });
    }
    return () => {
      setCurrentLatitude("");
      setCurrentLongitude("");
    };
  }, []);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        setItems(result.data);
        console.log(result.data);
      });
  }, []);

  const onCreateRoom = async () => {
    let roomObj = {
      name: reqDescription,
      sender_id: state.currentUser.id,
      receiver_id: requestOwner,
      request_id: requestId,
    };

    let tempArray = [roomObj, ...allRooms];

    axios
      .post("http://localhost:3000/conversations", roomObj, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        onRequestRoomCreate(res.data.id);
       // allRooms(tempArray);
      });
  };

  const onRequestRoomCreate = async (chatroomId) => {
    const data = {
      request_id: requestId,
      room_id: chatroomId,
    };

    axios
      .post("http://localhost:3000/requests_rooms", data, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
          
      });
      
  };

  const onVolunteerClick = async () => {
    setChatReceiverId(requestOwner);
    const data = {
      request_id: requestId,
      user_id: state.currentUser.id,
    };
    axios
      .post("http://localhost:3000/requests_users", data, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        res;
        console.log(res);
      });
    onCreateRoom();
  };
  const position = [51.505, -0.09];
  return (
    <div className="h-full grid mx-6">
      <MapContainer
        center={[currentLatitude, currentLongitude]} // center to users current location
        zoom={6}
        className="w-full col-span-2"
      >
        {/* <LayersControl position="topright" className="sidebar"></LayersControl> */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[6.67107, 3.25564]}>
              <Popup>
                <p>hello</p>
              </Popup>
            </Marker>; */}
        {items.map((items, index) => {
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
          console.log(items);
          if (fulfilled === false) {
            return (
              <Marker
                eventHandlers={{
                  click: (e) => {
                    setRequestId(id);
                    setRequestOwner(user_id);
                    setReqDescription(title);
                    //console.log("clicked", id);
                  },
                }}
                position={[lat, lng]}
                key={index}
              >
                <Popup className="request-popup rounded">
                  <div>
                    <h1 className="text-xl font-bold capitalize">{title}</h1>
                    <p>{description}</p>
                    <p>{request_type}</p>
                    <div className="text-right">
                      <button
                        onClick={onVolunteerClick}
                        className="bg-blue-500 px-6 py-3 text-white outline-none"
                      >
                        Volunteer
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          }
        })}
      </MapContainer>
    </div>
  );
}
export default Map;
