import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signout } from "../../Store/Userslice/user.service";
import ChatSideNav from "./ChatSideNav";
import ChatContainer from "./ChatContainer";
import ChatRightNav from "./ChatRightNav";
import ChatTopBar from "./ChatTopBar";

const ChatLayout = () => {
  return (
    <div className="flex flex-col gap-[1rem] h-[100vh] border-2 border-red-500 overflow-hidden px-[1rem] py-[0.5rem]">
      <ChatTopBar />
      <div className=" w-[100%] h-[93%] flex gap-[1rem]">
        <ChatSideNav />
        <ChatContainer />
        <ChatRightNav />
      </div>
    </div>
  );
};

export default ChatLayout;
