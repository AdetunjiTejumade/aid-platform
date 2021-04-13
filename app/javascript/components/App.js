import React, { useEffect, useState, useContext } from "react";
// import "./App.css";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import RequestForm from "./NewRequest";
import Login from "./pages/Login";
import axios from "axios";
import {
  UserContext,
  UserLatContext,
  UserLngContext,
  AllRequestContext,
  FirstNameContext,
  UserIdContext,
  RequestOwnerContext,
  AllVolunteerContext,
  RequestIdContext,
  ReqOwnerFirstNameContext,
  ChatContext,
  AllMessagesContext,
  AllRoomContext,
  SelectedRoomContext,
  SelectedChatContext,
  SelectedReqDescContext,
  ChatRoomIdContext,
  AllUserIdContext,
  RequestOwnerIdContext,
  CurrentRoomContext,
  UserClickedRequest,
  CurrentUserContext,
  RoomDataContext,
  HelperTextContext,
  ErrorContext,
  RequestFormContext,
  SelectedRequestContext,
  CurrentVolunteerContext,
  DeactivateContext,
  RepublishingContext,
} from "./contexts/ContextFile";
import Navbar from "./Navbar";
import Map from "./Map";
import RoomShow from "./RoomShow";

const App = ({ cableApp }) => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    token: JSON.parse(localStorage.getItem("token")) || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoggedIn: JSON.parse(localStorage.getItem("user")) ? true : false,
  });
  const csrf = document.querySelector('meta[name="csrf-token"]').content;
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);
  const [allRequest, setAllRequest] = useState([]);
  const [allVolunteers, setAllVolunteers] = useState([]);
  const [currentVol, setCurrentVol] = useState({});
  const [firstName, setFirstName] = useState("");
  const [requestOwner, setRequestOwner] = useState(null);
  const [userId, setUserId] = useState(null);
  const [requestId, setRequestId] = useState(null);

  const [reqOwnerFirstName, setReqOwnerFirstName] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({} || null);
  const [selectedChat, setSelectedChat] = useState([]);
  const [reqDescription, setReqDescription] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [deactivate, setDeactivate] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [allUserId, setAllUserId] = useState([]);
  const [chatReceiverId, setChatReceiverId] = useState(null);
  const [userRequest, setUserRequest] = useState({});

  const [allRooms, setAllRooms] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState({
    room: {},
    users: [],
    messages: [],
  });

  const [helperMessage, setHelperMessage] = useState("");
  const [error, setError] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  let [requiresRepublishing, setRequiresRepublishing] = useState(false);

  useEffect(() => {
    getCurrentUser();

    checkedLoggedIn();
    getAllRequest();
    getUserLocation();
    getAllRooms();
    getAllVolunteers();

    document.title = "Feed | Peeps";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkedLoggedIn = () => {
    let token = localStorage.getItem("token");
    if (token || userData.user) {
      setUserData({
        isLoggedIn: true,
      });
      console.log("loggedIn");
      // history.push("/map");
    } else if (!token || !userData.user) {
      setUserData({
        isLoggedIn: false,
      });
      history.push("/login");
    }
  };

  const getAllRequest = async () => {
    let res = await axios
      .get("https://helping-neighboors.herokuapp.com/requests/", {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${userData.token}`,
        },
      })
      .then(
        (response) => {
          // let filteredReq = response.data.filter(
          //   (item) => item.active === true
          // );
          // setAllRequest(filteredReq);
          setAllRequest(response.data);
        },
        (error) => {
          // console.log(error);
        }
      );

    return res;
  };

  // request greater that 24hrs, are not fulfilled and have less than 5 volunteers

  const getUserLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        let { latitude, longitude } = position.coords;

        setUserLat(latitude);
        setUserLng(longitude);
      },
      (error) => {
        if (error.code === 1) {
          setInterval(() => {
            alert(
              "Kindly allow location, for a more immersive experience with the app."
            );
          }, 10000);

          // console.log(error);
        }
      }
    );
  };

  const getCurrentUser = async () => {
    let res = await axios
      .get("https://helping-neighboors.herokuapp.com/users", {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${userData.token}`,
        },
      })
      .then(
        (response) => {
          // console.log(response.data);

          const getAllId = response.data.map((user) => user.id);
          setAllUserId(getAllId);
          if (userData.isLoggedIn) {
            const user = JSON.parse(localStorage.getItem("user"));
            const curUser = response.data.find(
              (item) => item.email === user.email
            );

            setUserId(curUser.id);
            setFirstName(curUser.first_name);

            setCurrentRoom({
              room: {},
              messages: [],
              users: [curUser, ...currentRoom.users],
            });

            setUserData({
              user: curUser,
              isLoggedIn: true,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    // console.log("i am getting all users");
    return res;
  };

  const getAllRooms = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;
    let res = await axios
      .get(`https://helping-neighboors.herokuapp.com/conversations/`, {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (response) => {
          setAllRooms(response.data);
        },
        (error) => {
          // console.log(error);
        }
      );

    return res;
  };

  const getAllVolunteers = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;
    let res = await axios
      .get(`https://helping-neighboors.herokuapp.com/requests_users/`, {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (response) => {
          setAllVolunteers(response.data);
        },
        (error) => {
          // console.log(error);
        }
      );

    return res;
  };

  return (
    <>
      <RequestFormContext.Provider
        value={{ showRequestForm, setShowRequestForm }}
      >
        <AllRequestContext.Provider value={{ allRequest, setAllRequest }}>
          <UserLngContext.Provider value={{ userLng, setUserLng }}>
            <UserLatContext.Provider value={{ userLat, setUserLat }}>
              <UserContext.Provider value={{ userData, setUserData }}>
                <FirstNameContext.Provider value={{ firstName, setFirstName }}>
                  <UserIdContext.Provider value={{ userId, setUserId }}>
                    <RequestOwnerContext.Provider
                      value={{ requestOwner, setRequestOwner }}
                    >
                      <AllVolunteerContext.Provider
                        value={{ allVolunteers, setAllVolunteers }}
                      >
                        <RequestIdContext.Provider
                          value={{ requestId, setRequestId }}
                        >
                          <ReqOwnerFirstNameContext.Provider
                            value={{ reqOwnerFirstName, setReqOwnerFirstName }}
                          >
                            <ChatContext.Provider
                              value={{ showChat, setShowChat }}
                            >
                              <AllMessagesContext.Provider
                                value={{ allMessages, setAllMessages }}
                              >
                                <AllRoomContext.Provider
                                  value={{ allRooms, setAllRooms }}
                                >
                                  <SelectedRoomContext.Provider
                                    value={{ selectedRoom, setSelectedRoom }}
                                  >
                                    <SelectedChatContext.Provider
                                      value={{ selectedChat, setSelectedChat }}
                                    >
                                      <SelectedReqDescContext.Provider
                                        value={{
                                          reqDescription,
                                          setReqDescription,
                                        }}
                                      >
                                        <ChatRoomIdContext.Provider
                                          value={{ chatRoomId, setChatRoomId }}
                                        >
                                          <AllUserIdContext.Provider
                                            value={{ allUserId, setAllUserId }}
                                          >
                                            <RequestOwnerIdContext.Provider
                                              value={{
                                                chatReceiverId,
                                                setChatReceiverId,
                                              }}
                                            >
                                              <CurrentRoomContext.Provider
                                                value={{
                                                  currentRoom,
                                                  setCurrentRoom,
                                                }}
                                              >
                                                <UserClickedRequest.Provider
                                                  value={{
                                                    userRequest,
                                                    setUserRequest,
                                                  }}
                                                >
                                                  <RoomDataContext.Provider
                                                    value={{
                                                      currentRoom,
                                                      setCurrentRoom,
                                                    }}
                                                  >
                                                    <CurrentUserContext.Provider
                                                      value={{
                                                        currentUser,
                                                        setCurrentUser,
                                                      }}
                                                    >
                                                      <ErrorContext.Provider
                                                        value={{
                                                          error,
                                                          setError,
                                                        }}
                                                      >
                                                        <HelperTextContext.Provider
                                                          value={{
                                                            helperMessage,
                                                            setHelperMessage,
                                                          }}
                                                        >
                                                          <SelectedRequestContext.Provider
                                                            value={{
                                                              selectedRequest,
                                                              setSelectedRequest,
                                                            }}
                                                          >
                                                            <CurrentVolunteerContext.Provider
                                                              value={{
                                                                currentVol,
                                                                setCurrentVol,
                                                              }}
                                                            >
                                                              <DeactivateContext.Provider
                                                                value={{
                                                                  deactivate,
                                                                  setDeactivate,
                                                                }}
                                                              >
                                                                <RepublishingContext.Provider
                                                                  value={{
                                                                    requiresRepublishing,
                                                                    setRequiresRepublishing,
                                                                  }}
                                                                >
                                                                  <Navbar />

                                                                  <Switch>
                                                                    {/* <Route exact path="/" component={Home} /> */}
                                                                    {/* TODO add login routes */}
                                                                    <Route
                                                                      exact
                                                                      path="/signup"
                                                                      component={
                                                                        SignUp
                                                                      }
                                                                    />
                                                                    <Route
                                                                      exact
                                                                      path="/login"
                                                                      component={
                                                                        Login
                                                                      }
                                                                    />

                                                                    <PrivateRoute
                                                                      exact
                                                                      path="/rooms/:id"
                                                                    >
                                                                      <RoomShow
                                                                        cableApp={
                                                                          cableApp
                                                                        }
                                                                      />
                                                                    </PrivateRoute>
                                                                    <PrivateRoute
                                                                      exact
                                                                      path="/new"
                                                                    >
                                                                      <RequestForm />
                                                                    </PrivateRoute>
                                                                    <PrivateRoute
                                                                      exact
                                                                      path="/map"
                                                                    >
                                                                      <Map />
                                                                    </PrivateRoute>
                                                                    {/* TODO add map */}
                                                                    <Route
                                                                      exact
                                                                      path="/"
                                                                    >
                                                                      <Home />
                                                                    </Route>
                                                                  </Switch>
                                                                </RepublishingContext.Provider>
                                                              </DeactivateContext.Provider>
                                                            </CurrentVolunteerContext.Provider>
                                                          </SelectedRequestContext.Provider>
                                                        </HelperTextContext.Provider>
                                                      </ErrorContext.Provider>
                                                    </CurrentUserContext.Provider>
                                                  </RoomDataContext.Provider>
                                                </UserClickedRequest.Provider>
                                              </CurrentRoomContext.Provider>
                                            </RequestOwnerIdContext.Provider>
                                          </AllUserIdContext.Provider>
                                        </ChatRoomIdContext.Provider>
                                      </SelectedReqDescContext.Provider>
                                    </SelectedChatContext.Provider>
                                  </SelectedRoomContext.Provider>
                                </AllRoomContext.Provider>
                              </AllMessagesContext.Provider>
                            </ChatContext.Provider>
                          </ReqOwnerFirstNameContext.Provider>
                        </RequestIdContext.Provider>
                      </AllVolunteerContext.Provider>
                    </RequestOwnerContext.Provider>
                  </UserIdContext.Provider>
                </FirstNameContext.Provider>
              </UserContext.Provider>
            </UserLatContext.Provider>
          </UserLngContext.Provider>
        </AllRequestContext.Provider>
      </RequestFormContext.Provider>
    </>
  );
};

export default App;

function PrivateRoute({ children, ...rest }) {
  let { userData } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
