import React, { useState, useEffect, createContext } from "react";
import Routes from "../routes/Index";
import axios from "axios";


// import { AuthContext } from "../contexts/auth";
export const AuthContext = createContext();
export const RequestOwnerIdContext = createContext();
export const RequestOwnerContext = createContext();
//export const UserLocation = createContext();

export const CurrentRoomContext = createContext();

// const [allRooms, setAllRooms] = useState([]);
// const [currentRoom, setCurrentRoom] = useState({
//   room: {},
//   users: [],
//   messages: [],
// });

const initialState = {
  isAuthenticated: localStorage.getItem("token") || false,
  user: null,
  token: null,
  currentUser: null,
  allRequests: null,
  allVolunteers: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    // case "ALLROOMS":
    //   return {
    //     ...state,
    //     allRooms: action.payload,
    //   };
    // case "CURRENTROOM":
    //   return {
    //     ...state,
    //     currentRoom: {
    //       room: action.payload,
    //      // messages: action.payload.attributes.messages,
    //       users: action.payload.attributes,
    //     },
    //   };
    case "ALLVOLUNTEERS":
      return {
        ...state,
        allVolunteers: action.payload,
      };
    case "ALLREQUESTS":
      return {
        ...state,
        allRequests: action.payload,
      };
    case "CURRENTUSER":
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
      };
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.values));
      localStorage.setItem("token", JSON.stringify(action.payload.data.jwt));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.values,
        token: action.payload.data.jwt,
      };
    case "SIGNUP":
      console.log("hey im ma do it");
      localStorage.setItem("user", JSON.stringify(action.payload.values));
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload.data.token.token)
      );
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.values,
        token: action.payload.data.token.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
function App({ cableApp }) {
  //console.log(props.cableApp);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [chatReceiverId, setChatReceiverId] = useState(null);
  const [requestOwner, setRequestOwner] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getCurrentUser();
    getAllRequests();
    getAllVolunteers();
  }, [initialState]);

  const getAllVolunteers = async () => {
    axios
      .get("http://localhost:3000/requests_users", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "ALLVOLUNTEERS",
          payload: res.data,
        });
      });
  };
  const getAllRequests = async () => {
    axios
      .get("http://localhost:3000/requests", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        //console.log(res.data);
        dispatch({
          type: "ALLREQUESTS",
          payload: res.data,
        });
      });
  };

  const getCurrentUser = async () => {
    axios
      .get("http://localhost:3000/users", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        if (state.isAuthentication !== "") {
          const user = JSON.parse(localStorage.getItem("user"));
          const curUser = res.data.find((item) => item.email === user.email);
          //console.log(curUser);
          dispatch({
            type: "CURRENTUSER",
            payload: curUser,
          });
          // dispatch({
          //   type: "CURRENTROOM",
          //   payload: curUser,
          // });
        }
        //console.log(res); console.log(props.cableApp);
      });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {/* <AllRoomContext value={{ allRooms, setAllRooms }}> */}
      {/* <RoomDataContext value={{ currentRoom, setCurrentRoom }}> */}
      <RequestOwnerIdContext.Provider
        value={{ chatReceiverId, setChatReceiverId }}
      >
        <RequestOwnerContext.Provider value={{ requestOwner, setRequestOwner }}>
          <Routes cableApp={cableApp} />
        </RequestOwnerContext.Provider>
      </RequestOwnerIdContext.Provider>

      {/* </RoomDataContext> */}
      {/* </AllRoomContext> */}
    </AuthContext.Provider>
  );
}
export default App;
