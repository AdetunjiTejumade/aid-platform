import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
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
  ErrorContext,
  PannedMapContext,
  RequestFormContext,
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

  const url = "https://helping-neighboors.herokuapp.com/requests/";
  //const header = JSON.parse(localStorage.getItem("header"));

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
      .post("https://helping-neighboors.herokuapp.com/conversations", roomObj, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (response) => {
          // console.log("success", response.data);
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

    const res = await axios
      .post("https://helping-neighboors.herokuapp.com/requests_users", data, {
        headers: {
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
    // alert(`create a room for you and ${reqOwnerFirstName}`);

    onCreateRoom();

    // setCurrentRoom({
    //   users: [userRequest, ...currentRoom.users],
    // });

    return res;
  };

  const onRequestRoomCreate = async (chatroomId) => {
    const data = {
      request_id: requestId,
      room_id: chatroomId,
    };

    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios
      .post("https://helping-neighboors.herokuapp.com/requests_rooms", data, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
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

    let res = await axios
      .get(
        `https://helping-neighboors.herokuapp.com/samevolunteer/${id}`,

        {
          headers: {
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

    // checkActiveRequest(requestId);
    return res;
  };
  const getRequestOwner = async (id) => {
    if (id) {
      const token = JSON.parse(localStorage.getItem("token"));

      let res = await axios
        .get(`https://helping-neighboors.herokuapp.com/users/${id}`, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        })
        .then(
          (response) => {
            //  console.log(response.data)
            // let ownerRec = Object.values(response.data);
            // console.log(ownerRec[0])
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
            // console.log(items); //TODO fix reload
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
                      //console.log("clicked", id);
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
                        <div className="text-right">
                          {renderButton()}
                          {/* <button
                        onClick={onVolunteerClick}
                        className="bg-blue-500 px-6 py-3 text-white outline-none"
                      >
                        Volunteer
                      </button> */}
                        </div>
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
