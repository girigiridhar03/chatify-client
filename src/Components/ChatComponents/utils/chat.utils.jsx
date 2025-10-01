import { useEffect, useState } from "react";
import { CgMathPlus } from "react-icons/cg";

const getSender = (loggedIn, users) => {
  return users[0]?._id === loggedIn ? users[1] : users[0];
};

export const UserCard = ({ chat, loggedInUser }) => {
  return (
    <div className="bg-white shadow-md rounded-lg px-3 py-2 w-full flex items-center justify-between cursor-pointer">
      {/* Avatar */}
      <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-gray-200">
        <img
          src={
            chat?.isGroupChat
              ? "https://imgs.search.brave.com/LjOJAkE0gZAIsmmtwZ3tRt-Z7kyyaNGcRrOr0ftGXxM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS81ODEt/NTgxMzUwNF9hdmF0/YXItZHVtbXktcG5n/LXRyYW5zcGFyZW50/LXBuZy5wbmc"
              : getSender(loggedInUser, chat?.users)?.profilePic?.url
          }
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name + Message */}
      <div className="flex-1 ml-3">
        <p className="font-semibold text-gray-900 capitalize">
          {chat?.isGroupChat
            ? chat?.chatName
            : getSender(loggedInUser, chat?.users)?.username}
        </p>
        <p className="text-sm text-gray-500 truncate w-[160px]">
          Are we meeting today? Lets Lorem ipsum dolor sit amet.
        </p>
      </div>

      {/* Time + Unread */}
      <div className="self-start mt-0.5">
        <p className="text-xs text-gray-500">3:45 PM</p>
        {/* <span className="mt-1 w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-r from-[#A259FF] to-[#6A11CB] text-white text-xs">
          1
        </span> */}
      </div>
    </div>
  );
};

export const SearchCards = ({ user, handleAccessChat, bgcolor, hideId }) => {
  const [buttonToggle, setButtonToggle] = useState(false);

  return (
    <div
      className={`${bgcolor} shadow-md rounded-lg px-3 py-2 w-full flex items-center gap-[10px] justify-between cursor-pointer`}
      onMouseEnter={() => setButtonToggle(true)}
      onMouseLeave={() => setButtonToggle(false)}
    >
      {/* Avatar */}
      <div className="flex items-center gap-[12px]">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={user?.profilePic?.url}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <div>
          <p className="text-lg truncate font-semibold capitalize">
            {user?.username}
          </p>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>
      {buttonToggle && !hideId?.includes(user?._id) && (
        <button
          title="Add"
          className="bg-gradient-to-r from-[#A259FF] to-[#6A11CB] w-[20px] h-[20px] rounded-full text-white flex items-center justify-center text-lg cursor-pointer"
          onClick={() => handleAccessChat(user)}
        >
          <CgMathPlus />
        </button>
      )}
    </div>
  );
};
