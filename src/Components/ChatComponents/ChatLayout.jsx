import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signout } from "../../Store/Userslice/user.service";
import ChatSideNav from "./ChatSideNav";
import ChatContainer from "./ChatContainer";
import ChatRightNav from "./ChatRightNav";

const ChatLayout = () => {
  // const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  // const dispatch = useDispatch();
  return (
    <div className="bg-[#F5F5F5] w-[100%] h-[100vh] flex">
      <ChatSideNav />
      <ChatContainer />
      <ChatRightNav />
    </div>
  );
};

export default ChatLayout;
