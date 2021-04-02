import React, { useEffect, useContext } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Faker from "faker";
import {
  UserIdContext,
  ReqOwnerFirstNameContext,
  RoomDataContext,
} from "./contexts/ContextFile";

export default function ChatMessage({ message }) {
  useEffect(() => {
    getRecipient();
    document.title = `${
      reqOwnerFirstName ? reqOwnerFirstName : ``
    } | Chat `;
  });
  dayjs.extend(relativeTime);

  let { userId } = useContext(UserIdContext);

  let { reqOwnerFirstName, setReqOwnerFirstName } = useContext(
    ReqOwnerFirstNameContext
  );
  let { currentRoom } = useContext(RoomDataContext);

  const getRecipient = () => {
    if (currentRoom.room.users) {
      let recipient = currentRoom.room.users.filter(
        (user) => user.id !== userId
      );
      let recipientName = recipient.map((item) => item.first_name);
      setReqOwnerFirstName(recipientName[0]);
    }
  };

  return (

      <div class="chat-message">
        <div
          class={
            message.user_id === userId
              ? "flex items-end justify-end"
              : "flex items-end"
          }
        >
          {/* if usr not current user */}
          <div
            class={
              message.user_id === userId
                ? "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
                : "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
            }
          >
            <div>
              <span
                class={
                  message.user_id === userId
                    ? "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
                    : "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                }
              >
                {message.body}
              </span>
            </div>
          </div>
          <img
            src={Faker.image.people()}
            alt="faker profile pic"
            class={
              message.user_id === userId
                ? "w-6 h-6 rounded-full order-2"
                : "w-6 h-6 rounded-full order-1"
            }
          />
        </div>
      </div>
  );
}
