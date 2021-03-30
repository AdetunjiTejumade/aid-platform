import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import RequestForm from "../components/NewRequest";
import ListRequest from "../components/ListRequests";
import RequestDetail from "../components/RequestDetail";
import Rooms from "../components/Room";
import RoomShow from "../components/RoomShow";
import Map from "../components/Map"
import { AuthContext } from "../components/App";

export const RoomDataContext = createContext();
export const AllRoomsContext = createContext();
function Routes({cableApp}) {
  const token = JSON.parse(localStorage.getItem("token"));
  const history = useHistory();
 
  const { state, dispatch } = useContext(AuthContext);
  const initialState = {
    room: {},
    users: [],
    messages: [],
  };
  const [currentRoom, setCurrentRoom] = useState(initialState);
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = async () => {
    axios
      .get(`http://localhost:3000/conversations/`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setAllRooms(res.data);
      });
  };
  const updateAppStateRoom = (newRoom) => {
    currentRoom({
      room: newRoom.room.data,
      users: newRoom.users,
      messages: newRoom.messages,
    });
  };
  const getRoomData = (id) => {
    axios
      .get(`http://localhost:3000/conversations/${id}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        setCurrentRoom({
          room: res.data,
          messages: res.data.messages,
          users: res.data.users,
        });
        console.log(res);
      });
  };

  const subscribeToRoom = (e) => {
    const room_id = e.target.id;
    state.currentUser
      ? postFirstMessage(room_id)
      : alert("You must be logged in to subscribe to a room.");
  };
  const postFirstMessage = (roomId) => {
    window.history.pushState(null, null, `/rooms/${roomId}`);

    const message = {
      content: `${state.currentUser.username} has joined this room!`,
      user_id: state.currentUser.id,
      room_id: roomId,
    };
    axios
      .post("http://localhost:3000/messages", message, {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res)
      .then((result) => {
        console.log(result);
      });
  };
  const Logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    // history.push("/");
  };

  return (
    <Router>
      <div className="md:flex justify-between text-blue-500 p-6">
        {/* logo */}
        <div className="">
          <Link to="/">HELPING HANDS</Link>
        </div>

        <nav className="md:block ">
          <Link to="/map" className="pr-5 block md:inline uppercase">
            Map
          </Link>
          <Link to="/new_request" className="pr-5 block md:inline uppercase">
            Add Request
          </Link>

          <Link to="/rooms" className="pr-5 uppercase block md:inline">
            Rooms
          </Link>
          {state.isAuthenticated ? (
            <Link
              to="/logout"
              onClick={Logout}
              className="bg-blue-500 text-white p-6 md:inline"
            >
              Log out
            </Link>
          ) : (
            <Link
              to="/sign_up"
              className="bg-blue-500 text-white p-6 md:inline"
            >
              SIGN UP
            </Link>
          )}
        </nav>
      </div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route exact path="/map">
          <Map allRooms={allRooms} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/sign_up">
          <SignUp />
        </Route>
        <Route path="/new_request">
          <RequestForm />
        </Route>
        <Route exact path="/help_requests">
          <ListRequest />
        </Route>
        <Route exact path="/help_requests/:requestId">
          <RequestDetail />
        </Route>
        <Route
          exact
          path="/rooms"
          render={(props) => (
            <Rooms
              allRooms={allRooms}
              currentUser={state.currentUser}
              handleSubscribe={subscribeToRoom}
            />
          )}
        />
        <Route
          exact
          path="/rooms/:id"
          render={(props) => {
            return state.currentUser ? (
              <RoomShow
                {...props}
                cableApp={cableApp}
                getRoomData={getRoomData}
                updateApp={updateAppStateRoom}
                roomData={currentRoom}
                currentUser={state.currentUser}
              />
            ) : (
              <Redirect to="/rooms" />
            );
          }}
        />
      </Switch>
    </Router>
  );
}

export default Routes;
