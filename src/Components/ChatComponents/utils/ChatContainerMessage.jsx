import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages } from "../../../Store/ChatSlice/chat.service";

const ChatContainerMessage = () => {
  const allMessages = useSelector((state) => state?.chatReducer?.allMessages);
  const selectedChat = useSelector((state) => state?.chatReducer?.selectedChat);
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);

  console.log(userDetails?._id)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  useEffect(() => {
    dispatch(fetchAllMessages(selectedChat));
  }, [selectedChat]);

  return (
    <div className="flex flex-col gap-2">
      {allMessages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded-xl max-w-[60%] ${
            msg.sender?._id === userDetails?._id
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-200 text-gray-800 self-start"
          }`}
        >
          {msg.content}
        </div>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatContainerMessage;
