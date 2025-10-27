import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages } from "../../../Store/ChatSlice/chat.service";
import TypingIndicator from "./ChatTypingIndicator";
import moment from "moment";

const ChatContainerMessage = ({ allMessages, otherUsersTyping }) => {
  const selectedChat = useSelector((state) => state?.chatReducer?.selectedChat);
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [allMessages]);

  useEffect(() => {
    if (!selectedChat) return;
    dispatch(fetchAllMessages(selectedChat));
  }, [selectedChat]);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto px-4 py-2 h-full">
      {allMessages?.map((msg, i) => (
        <React.Fragment key={i}>
          <div className="my-1 text-sm text-gray-500 text-center font-semibold">
            {moment(msg?.date).isSame(moment(), "day")
              ? "Today"
              : moment(msg?.date).isSame(moment().subtract(1, "days"), "day")
              ? "Yesterday"
              : moment(msg?.date).format("DD-MMM-YYYY")}
          </div>
          {msg?.messages?.map((message, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl max-w-[60%] flex-wrap flex items-end gap-[0.8rem] ${
                message.sender?._id === userDetails?._id
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              <span>{message.content}</span>
              <span
                className={`text-[11px] font-semibold ${
                  message.sender?._id === userDetails?._id
                    ? "text-gray-300"
                    : "text-gray-500"
                }`}
              >
                {moment(message?.createdAt).format("hh:mm A")}
              </span>
            </div>
          ))}
        </React.Fragment>
      ))}
      {otherUsersTyping && <TypingIndicator />}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatContainerMessage;
