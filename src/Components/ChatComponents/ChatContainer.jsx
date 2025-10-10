import React, { useEffect, useRef } from "react";
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
import { getSender } from "./Helpers/HelperFunctions";

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
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [otherUsersTyping, setOtherUsersTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeOutRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setMessages(allMessages);
  }, [allMessages]);

  useEffect(() => {
    if (!singleChatDetails || Object.keys(singleChatDetails)?.length === 0)
      return;
    const userId = getSender(userDetails?._id, singleChatDetails?.users)?._id;
    setSelectedUser(userId);
  }, [singleChatDetails]);

  // Connect to Socket
  useEffect(() => {
    if (!userDetails || !selectedUser) return;

    const registerUser = () => {
      socket.emit("register_user", {
        name: userDetails?.username,
        _id: userDetails?._id,
      });
    };

    if (socket.connected) {
      registerUser();
    } else {
      socket.on("connect", registerUser);
    }

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_stop_typing", ({ chatId, userId }) => {
      if (chatId === selectedChat && userId !== userDetails._id) {
        setOtherUsersTyping(false);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("receive_message");
      socket.off("user_online_status");
    };
  }, [userDetails, selectedUser, selectedChat]);

  useEffect(() => {
    if (!selectedChat) return;
    socket.on("user_online_status", ({ userId, online }) => {
      if (selectedUser === userId) {
        setIsOnline(online);
      }
    });

    socket.on("user_typing", ({ chatId, userId }) => {
      if (chatId === selectedChat && userId !== userDetails._id) {
        setOtherUsersTyping(true);
      }
    });

    return () => {
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, [selectedChat]);

  // Join Chat || CheckUserOnline
  useEffect(() => {
    if (!selectedUser || !selectedChat) return;
    socket.emit("join_chat", selectedChat);
    socket.emit("check_user_online", { selectedUser: selectedUser });
  }, [selectedUser, selectedChat]);

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

  const handleChangeInput = (e) => {
    dispatch(setSendMessageValue(e.target.value));

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", { chatId: selectedChat, userId: userDetails?._id });
    }

    clearTimeout(typingTimeOutRef.current);

    typingTimeOutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("stop_typing", {
        chatId: selectedChat,
        userId: userDetails?._id,
      });
    }, 1000);
  };

  console.log(isOnline);

  return (
    <div className="w-[80%] h-[100%] bg-[#ffffff] shadow-lg rounded-lg flex flex-col overflow-hidden">
      {/* TopBar */}

      <div className="bg-white h-[9%] shadow overflow-hidden">
        <ChatContainerTopBar
          singleChatDetails={singleChatDetails}
          userDetails={userDetails}
          dispatch={dispatch}
          isOnline={isOnline}
        />
      </div>
      {/* Message Section */}
      <div className="bg-[#F5F5F5] flex-1 overflow-y-auto w-full h-full p-[1.3rem] flex flex-col">
        <ChatContainerMessage
          allMessages={messages}
          otherUsersTyping={otherUsersTyping}
        />
      </div>

      <div className="bg-white h-[7%] shadow overflow-hidden">
        <ChatContainerFooter
          sendMessageValue={sendMessageValue}
          handleSendMessage={handleSendMessage}
          handleChangeInput={handleChangeInput}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
