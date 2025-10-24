import React, { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setProfileId,
  setProfileToggleModal,
  setSearchValue,
} from "../../Store/Userslice/userslice";
import { searchUsers } from "../../Store/Userslice/user.service";
import { setNotificationToggle } from "../../Store/NotificationSlice/notificationSlice";
import {
  getAllNotifications,
  viewNotification,
} from "../../Store/NotificationSlice/notification.service";

const ChatTopBar = () => {
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const searchValue = useSelector((state) => state?.authReducer?.searchValue);
  const notificationCount = useSelector(
    (state) => state?.notificationReducer?.notificationCount
  );
  const notification = useSelector(
    (state) => state?.notificationReducer?.notification
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchUsers(searchValue));
  }, [searchValue]);

  useEffect(() => {
    dispatch(getAllNotifications());
  }, []);

  return (
    <div className="bg-[#F5F5F5] shadow-md rounded-lg w-[100%] h-[7%] flex items-center justify-between px-[1rem] py-[0.5rem]">
      {/* Heading */}
      <h3 className="text-xl md:text-2xl font-bold">Chatify</h3>

      {/* Search */}
      <div className=" flex items-center h-[35px] md:h-[45px] px-[10px] rounded-xl bg-white gap-[.5rem] w-[50%]">
        <div>
          <div className="text-[#747272] text-lg md:text-xl">
            <IoSearch />
          </div>
        </div>
        <input
          type="text"
          className="flex-1 outline-0 placeholder:font-semibold text-sm md:text-lg"
          value={searchValue}
          onChange={(e) => dispatch(setSearchValue(e?.target?.value))}
          placeholder="Search..."
        />
      </div>

      {/* Notification and Profile Pic */}
      <div className="flex items-center gap-[1rem] h-full">
        <div className="relative">
          {notificationCount > 0 && (
            <p className="absolute bg-red-600 w-[15px] h-[15px] rounded-full flex items-center justify-center text-[10px] font-semibold text-white right-0 top-[-6px] z-20">
              {notificationCount}
            </p>
          )}

          <button
            disabled={notification?.length === 0 ? true : false}
            onClick={() => {
              dispatch(setNotificationToggle(true));
              dispatch(viewNotification());
            }}
            className={`text-lg md:text-2xl text-gray-500 ${
              notification?.length === 0
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <IoNotifications />
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              dispatch(setProfileToggleModal(true));
              dispatch(setProfileId(userDetails?._id));
            }}
            className="w-[30px] h-[30px] md:w-[39px] md:h-[39px] rounded-full overflow-hidden cursor-pointer"
          >
            <img
              src={userDetails?.profilePic?.url}
              alt="user"
              className="w-full h-full object-cover "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTopBar;
