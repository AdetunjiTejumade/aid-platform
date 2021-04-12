import React, { useContext, useEffect, useRef, useState } from "react";
import {
  RoomDataContext,
  UserIdContext,
  ChatRoomIdContext,
  ReqOwnerFirstNameContext,
  CurrentVolunteerContext,
  DeactivateContext,
  RepublishingContext,
} from "./contexts/ContextFile";
import ChatMessage from "./ChatMessage";
import "../../assets/stylesheets/chat.css"; //app\assets\stylesheets\Chat.scss
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
// import Typography from "@material-ui/core/Typography";
import Faker from "faker";
import Checkbox from "@material-ui/core/Checkbox";
import Footer from "./pages/Footer";

function RoomShow({ cableApp }) {
  useEffect(() => {}, []);
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
  });

  let { currentRoom, setCurrentRoom } = useContext(RoomDataContext);
  let { userId } = useContext(UserIdContext);
  let { chatRoomId } = useContext(ChatRoomIdContext);
  let { currentVol } = useContext(CurrentVolunteerContext);

  let [checked, setChecked] = useState(currentVol.fulfilled || "");
  let location = useLocation();

  let { deactivate, setDeactivate } = useContext(DeactivateContext);

  let { reqOwnerFirstName } = useContext(ReqOwnerFirstNameContext);

  let { requiresRepublishing } = useContext(RepublishingContext);

  let roomParam =
    currentRoom.room.id || parseInt(location.pathname.match(/\d+$/)[0]);

  useEffect(() => {
    getRoomData(chatRoomId || roomParam);

    createWebSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputRef = useRef();

  const handleChecked = (e) => {
    if (currentRoom.messages.length > 0) {
      //
      setChecked((prevValue) => !prevValue);
      // console.log(e.target.checked);

      alterFulfilled(currentVol.id);

      if (checked) {
        alert(`setting fulfilled to ${e.target.checked}`);
      } else if (!checked) {
        alert(`setting fulfilled to ${e.target.checked}`);
      }
      //
    } else {
      alert("You must send a message before you fulfill this request");
    }
  };

  const requestToFulfil = (id) => {
    let obj = {
      fulfilled: true,
    };

    const token = JSON.parse(localStorage.getItem("token"));

    let res = axios
      .patch(`https://helping-neighboors.herokuapp.com/requests/${id}`, obj, {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (response) => {
          // console.log("success", response.data);
        },
        (error) => {
          // console.log("Error", error);
        }
      );

    return res;
  };

  const checkActiveRequest = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    let res = await axios
      .get(`https://helping-neighboors.herokuapp.com/deactivate/${id}`, {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (response) => {
          // alert(response.data + 'requestToFulfil')
          setDeactivate(response.data);
          if (response.data === true) {
            requestToFulfil(currentVol.request_id);
            deactivateRooms(currentVol.request_id);

            alert(
              "This request has been set to fulfilled and the room has been archived"
            );
          }
        },
        (error) => {
          // console.log(error);
        }
      );

    return res;
  };
  // console.log(currentVol.request_id);

  const deactivateRooms = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    let res = await axios
      .get(`https://helping-neighboors.herokuapp.com/deactivaterooms/${id}`, {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (response) => {
          //  console.log(response.data);
        },
        (error) => {
          //  console.log(error);
        }
      );

    return res;
  };

  if (deactivate === true) {
    deactivateRooms(currentVol.request_id);
  }

  const alterFulfilled = (id) => {
    let obj = {
      fulfilled: !checked,
    };

    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    let res = axios
      .patch(
        `https://helping-neighboors.herokuapp.com/requests_users/${id}`,
        obj,
        {
          headers: {
            "X-CSRF-Token": csrf,
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then(
        (response) => {
          //  console.log("success", response.data);
        },
        (error) => {
          //  console.log("Error", error);
        }
      );

    return res;
  };

  const getRoomData = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    let res = await axios
      .get(`https://helping-neighboors.herokuapp.com/conversations/${id}`, {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
        },
      })
      .then(
        (result) => {
          // console.log(result.data);
          checkActiveRequest(currentVol.request_id);
          setCurrentRoom({
            room: result.data,
            messages: result.data.messages,
            // users: [...currentRoom.users]
          });
          console.log("data", result);
        },
        (error) => {
          // console.log(error);
        }
      );

    return res;
  };

  const createWebSocket = () => {
    cableApp.conversation = cableApp.cable.subscriptions.create(
      {
        channel: "ConversationChannel",
        conversation: chatRoomId || roomParam,
      },
      {
        received: (updatedRoom) => {
          updateAppStateRoom(updatedRoom);
        },
      }
    );

    getRoomData(chatRoomId || roomParam);
    console.log(chatRoomId);
  };

  const updateAppStateRoom = (newRoom) => {
    console.log("here");
    setCurrentRoom({
      room: newRoom.conversation,
      // users: newRoom.users,
      messages: newRoom.messages,
    });
  };

  const onSubmit = (e) => {
    console.log("clicked");
    const token = JSON.parse(localStorage.getItem("token"));

    const csrf = document.querySelector('meta[name="csrf-token"]').content;
    let message = {
      body: inputRef.current.value,
      user_id: userId,
      conversation_id: chatRoomId || roomParam,
    };

    // console.log(message);

    if (inputRef.current.value.length === 0) {
      alert("message can not be empty");
    }

    inputRef.current.value = "";

    let res = axios
      .post("https://helping-neighboors.herokuapp.com/messages", message, {
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("Success", response.data);
      })
      .catch((error) => {
        console.error("failed");
      });

    return res;
  };

  const displayMessages = (messages) => {
    return messages.map((message) => {
      return <ChatMessage key={message.id} message={message} />;
    });
  };

  return (
    <>
      {requiresRepublishing ? (
        <div className="text-center m-auto">
          <h3>The Request Owner has to republish this request</h3>
          <Link onClick={() => window.location.reload()} to="/map">
            Go to Feeds
          </Link>
        </div>
      ) : (
        <>
          <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
              <div class="flex items-center space-x-2"></div>
              <div class="flex items-center space-x-4">
                <img
                  src={Faker.image.people()}
                  alt="faker profile pic"
                  class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                />

                <div class="flex flex-col leading-tight">
                  <div class="text-2xl mt-1 flex items-center">
                    <span class="text-gray-700 mr-3">{reqOwnerFirstName}</span>
                    <span class="text-green-500">
                      <svg width="10" height="10">
                        <circle
                          cx="5"
                          cy="5"
                          r="5"
                          fill="currentColor"
                        ></circle>
                      </svg>
                    </span>
                  </div>
                  <span class="text-lg text-gray-600">
                    {currentRoom.room.name}
                  </span>
                  {/* TODO add title */}
                </div>
              </div>
            </div>

            <div
              id="messages"
              class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
              {currentRoom.messages ? (
                displayMessages(currentRoom.messages)
              ) : (
                <h3 className="text-center">
                  This room has no messages yet - be the first to post!
                </h3>
              )}
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0"
            >
              <div class="relative flex">
                <input
                  type="text"
                  ref={inputRef}
                  placeholder="Write Something"
                  class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
                />
                <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
                  <button
                    type="submit"
                    class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="h-6 w-6 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <>
            <Footer />
          </>
        </>
      )}
    </>
  );
}

export default RoomShow;
