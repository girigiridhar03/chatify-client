import React from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../../Store/ChatSlice/chatSlice";
import moment from "moment";
import { setNotificationToggle } from "../../../Store/NotificationSlice/notificationSlice";

const NotificationModal = () => {
  const notification = useSelector(
    (state) => state.notificationReducer?.notification
  );
  const dispatch = useDispatch();

  return (
    <div className="bg-white  w-[90%] md:w-[60%] lg:w-[50%] xl:w-[30%] rounded-xl shadow-lg flex flex-col gap-6 absolute right-3.5 top-22 max-h-[350px] overflow-auto">
      {/* Notification Header */}
      <div className="border-b-1 border-gray-300 pb-3 flex items-center justify-between sticky top-0 bg-white w-full p-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <button
          onClick={() => dispatch(setNotificationToggle(false))}
          className="text-lg cursor-pointer"
        >
          <IoClose />
        </button>
      </div>
      <div className="p-4 flex flex-col w-full gap-3.5">
        {notification?.map((item) => (
          <div key={item?._id} className="flex flex-col gap-[1rem]">
            <h5 className="text-gray-400 font-bold">{item?._id}</h5>
            <div className="flex flex-col gap-[1rem]">
              {item?.notifications.map((item) => (
                <div
                  key={item?._id}
                  onClick={() => dispatch(setSelectedChat(item?.chat?._id))}
                  className="bg-gray-200 p-3 shadow-lg w-full rounded-xl flex gap-1.5 items-center"
                >
                  <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
                    <img
                      src={item?.sender?.profilePic?.url}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-[90%]">
                    <div className="flex items-center justify-between w-full">
                      <p className="font-semibold">{item?.sender?.username}</p>
                      <p className="text-sm text-gray-600">
                        {moment(item?.createdAt).format("hh:mm A")}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {item?.message?.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationModal;
