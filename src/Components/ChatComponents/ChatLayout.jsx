import ChatSideNav from "./ChatSideNav";
import ChatContainer from "./ChatContainer";
import ChatRightNav from "./ChatRightNav";
import ChatTopBar from "./ChatTopBar";
import { useDispatch, useSelector } from "react-redux";
import { SearchCards } from "./utils/chat.utils";
import { accessChat, fetchChats } from "../../Store/ChatSlice/chat.service";
import { useEffect } from "react";
import { socket } from "./utils/socket";
import ProfileModal from "./utils/ProfileModal";
import ChatGroupModal from "./utils/ChatGroupModal";
import NotificationModal from "./utils/NotificationModal";
import {
  setNotification,
  setNotificationCount,
} from "../../Store/NotificationSlice/notificationSlice";
import moment from "moment";
import { useRef } from "react";

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
  const notificationToggle = useSelector(
    (state) => state.notificationReducer?.notificationToggle
  );
  const notification = useSelector(
    (state) => state.notificationReducer?.notification
  );
  const selectedChat = useSelector((state) => state.chatReducer?.selectedChat);
  const dispatch = useDispatch();
  const notificationRef = useRef(notification);

  useEffect(() => {
    notificationRef.current = notification;
  }, [notification]);

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
    const handleNotification = (data) => {
      const dateId = moment(data?._id).format("YYYY-MM-DD");

      const getIndex = notificationRef.current.findIndex((item) =>
        moment(item?._id).isSame(moment(dateId), "day")
      );
      let updatedMessages;
      if (getIndex !== -1) {
        updatedMessages = [...notificationRef.current];
        updatedMessages[getIndex] = {
          ...updatedMessages[getIndex],
          notifications: [
            ...updatedMessages[getIndex].notifications,
            ...data.notifications,
          ],
        };
      } else {
        updatedMessages = [
          ...notificationRef.current,
          { _id: dateId, notifications: [...data.notifications] },
        ];
      }

      dispatch(setNotification(updatedMessages));

      // Browser notification
      const firstNotification = data.notifications[0];
      if (!firstNotification) return;

      const showNotification = (username, message) => {
        new Notification(`New message from ${username}`, {
          body: message,
        });
      };

      if (Notification.permission === "granted") {
        showNotification(
          firstNotification.sender?.username,
          firstNotification.message?.content
        );
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            showNotification(
              firstNotification.sender?.username,
              firstNotification.message?.content
            );
          }
        });
      }
    };

    socket.on("notification", handleNotification);

    socket.on("notification_count", (data) => {
      dispatch(setNotificationCount(data?.notificationCount));
    });

    return () => {
      socket.off("notification", handleNotification);
      socket.off("notification_count");
    };
  }, []); // run once

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
      {usersBySearch?.length > 0 && (
        <div className="w-[90%] md:w-[51%] h-[500px] absolute  left-1/2 -translate-x-1/2 top-[8%]">
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
        </div>
      )}

      <ChatTopBar />
      <div className=" w-[100%] h-[93%] flex overflow-hidden py-[0.3rem]">
        <div className="w-full h-full lg:hidden">
          {!selectedChat ? <ChatSideNav /> : <ChatContainer />}
        </div>
        <div className="w-full h-full hidden lg:flex gap-[1rem]">
          <ChatSideNav />
          <ChatContainer />
        </div>

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

      {/* Notification Modal */}
      {notificationToggle && <NotificationModal />}
    </div>
  );
};

export default ChatLayout;
