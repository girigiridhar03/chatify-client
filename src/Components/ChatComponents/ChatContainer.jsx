import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleChatDetails,
  sendMessage,
} from "../../Store/ChatSlice/chat.service";
import { ChatContainerFooter, ChatContainerTopBar } from "./utils/chat.utils";
import ChatContainerMessage from "./utils/ChatContainerMessage";
import { setSendMessageValue } from "../../Store/ChatSlice/chatSlice";
import { socket } from "./utils/socket";
import { useState } from "react";

const ChatContainer = () => {
  const selectedChat = useSelector((state) => state.chatReducer?.selectedChat);
  const singleChatDetails = useSelector(
    (state) => state.chatReducer?.singleChatDetails
  );
  const sendMessageValue = useSelector(
    (state) => state.chatReducer?.sendMessageValue
  );
  const allMessages = useSelector((state) => state?.chatReducer?.allMessages);
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setMessages(allMessages);
  }, [allMessages]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("register_user", {
        name: userDetails?.username,
        _id: userDetails?._id,
      });
    });

    socket.on("receive_message", (data) => {
      console.log("data from receiver: ", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    if (!selectedChat) return;
    socket.emit("join_chat", selectedChat);
  }, [selectedChat]);

  useEffect(() => {
    if (!selectedChat) return;
    dispatch(getSingleChatDetails(selectedChat));
  }, [selectedChat]);

  if (Object.keys(singleChatDetails)?.length === 0) {
    return <div>No data</div>;
  }

  const handleSendMessage = () => {
    if (!sendMessageValue) return;

    dispatch(sendMessage({ chatId: selectedChat, content: sendMessageValue }));
    socket.emit("send_message", {
      chatId: selectedChat,
      senderId: userDetails?._id,
      content: sendMessageValue,
      profilePic: userDetails?.profilePic,
    });
    dispatch(setSendMessageValue(""));
  };

  return (
    <div className="w-[80%] h-[100%] bg-[#ffffff] shadow-lg rounded-lg flex flex-col overflow-hidden">
      {/* TopBar */}

      <div className="bg-white h-[9%] shadow overflow-hidden">
        <ChatContainerTopBar
          singleChatDetails={singleChatDetails}
          userDetails={userDetails}
          dispatch={dispatch}
        />
      </div>
      {/* Message Section */}
      <div className="bg-[#F5F5F5] flex-1 overflow-y-auto w-full h-full p-[1.3rem] flex flex-col">
        <ChatContainerMessage allMessages={messages} />
      </div>

      <div className="bg-white h-[7%] shadow overflow-hidden">
        <ChatContainerFooter
          dispatch={dispatch}
          sendMessageValue={sendMessageValue}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
