import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleChatDetails } from "../../Store/ChatSlice/chat.service";
import { ChatContainerFooter, ChatContainerTopBar } from "./utils/chat.utils";
import ChatContainerMessage from "./utils/ChatContainerMessage";

const ChatContainer = () => {
  const selectedChat = useSelector((state) => state.chatReducer?.selectedChat);
  const singleChatDetails = useSelector(
    (state) => state.chatReducer?.singleChatDetails
  );
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedChat) return;
    dispatch(getSingleChatDetails(selectedChat));
  }, [selectedChat]);

  if (Object.keys(singleChatDetails)?.length === 0) {
    return <div>No data</div>;
  }

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
        <ChatContainerMessage />
      </div>

      <div className="bg-white h-[7%] shadow overflow-hidden">
        <ChatContainerFooter />
      </div>
    </div>
  );
};

export default ChatContainer;
