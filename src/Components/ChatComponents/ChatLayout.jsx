import ChatSideNav from "./ChatSideNav";
import ChatContainer from "./ChatContainer";
import ChatRightNav from "./ChatRightNav";
import ChatTopBar from "./ChatTopBar";
import { useDispatch, useSelector } from "react-redux";
import { SearchCards } from "./utils/chat.utils";
import { accessChat, fetchChats } from "../../Store/ChatSlice/chat.service";
import ChatGroupModal from "./ChatGroupModal";
import ProfileModal from "./ProfileModal";
import { useEffect } from "react";
import { socket } from "./utils/socket";
import {
  setNotification,
  setNotificationCount,
} from "../../Store/ChatSlice/chatSlice";

const ChatLayout = () => {
  const usersBySearch = useSelector(
    (state) => state?.authReducer?.usersBySearch
  );
  const toggleModalVal = useSelector(
    (state) => state?.authReducer?.toggleModalVal
  );
  const profileModalToggle = useSelector(
    (state) => state?.authReducer?.profileModalToggle
  );
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const notification = useSelector((state) => state.chatReducer?.notification);
  const dispatch = useDispatch();

  console.log(notification);

  useEffect(() => {
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
  }, [userDetails]);

  useEffect(() => {
    socket.on("notification", (data) => {
      dispatch(setNotification(data));

      if (Notification.permission === "granted") {
        new Notification(`New message from ${data.username}`, {
          body: data.message,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(`New message from ${data.username}`, {
              body: data.message,
            });
          }
        });
      }
    });

    socket.on("notification_count", (data) => {
      dispatch(setNotificationCount(data?.notificationCount));
    });

    return () => {
      socket.off("notification");
      socket.off("notification_count");
    };
  }, []);

  const handleAccessChat = async (user) => {
    try {
      const response = await dispatch(accessChat(user?._id)).unwrap();
      if (response?.status === 200) {
        dispatch(fetchChats());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-[1rem] h-[100vh] overflow-hidden px-[1rem] py-[0.5rem] relative bg-[#ececec]">
      {/* Search Box */}
      <div className=" w-[51%] h-[500px] absolute  left-1/2 -translate-x-1/2 top-[8%]">
        {usersBySearch?.length > 0 && (
          <div className="bg-white  shadow-lg rounded-lg w-[95%] mx-auto max-h-[400px] overflow-auto p-[1rem] flex flex-col gap-[13px]">
            <h5 className="text-lg text-gray-500 font-semibold">Users</h5>
            {usersBySearch?.map((user) => (
              <SearchCards
                key={user?._id}
                user={user}
                handleAccessChat={handleAccessChat}
                bgcolor={`bg-white`}
              />
            ))}
          </div>
        )}
      </div>
      <ChatTopBar />
      <div className=" w-[100%] h-[93%] flex gap-[1rem] overflow-hidden py-[0.3rem]">
        <ChatSideNav />
        <ChatContainer />
        {/* <ChatRightNav /> */}
      </div>

      {/* Modal */}
      {toggleModalVal && (
        <ChatGroupModal
          headingName={"Create Group Chat"}
          buttonName={"Create Chat"}
          buttonColor={"bg-gradient-to-r from-[#A259FF] to-[#6A11CB]"}
          placeHolderOne={"Group Name"}
          placeHolderTwo={"Search User"}
        />
      )}

      {/* Profile Modal */}
      {profileModalToggle && <ProfileModal />}
    </div>
  );
};

export default ChatLayout;
