import { useState } from "react";
import { CgMathPlus } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

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

export const InputFields = ({
  username,
  about,
  singleUserDetails,
  setUsername,
  setAbout,
}) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full border-y-2 border-gray-200 py-4">
        <div className="flex w-full">
          <p className="w-[30%]">Username</p>
          <div className="w-[70%]">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[100%] border-2 border-[#cfcfcf] text-[15px] rounded-lg p-[10px]"
            />
          </div>
        </div>
      </div>
      <div className="w-full border-y-2 border-gray-200 py-4">
        <div className="flex w-full">
          <p className="w-[30%]">Email</p>
          <div className="w-[70%]">
            <input
              type="text"
              value={singleUserDetails?.email}
              className="w-[100%] border-2 border-[#cfcfcf] text-[15px] rounded-lg p-[10px] bg-gray-300"
              disabled={true}
            />
          </div>
        </div>
      </div>
      <div className="w-full border-y-2 border-gray-200 py-4">
        <div className="flex w-full">
          <p className="w-[30%]">About</p>
          <div className="w-[70%]">
            <textarea
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-[100%] border-2 border-[#cfcfcf] text-[15px] rounded-lg p-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const FooterButtons = ({
  showEditForm,
  handleSignout,
  dispatch,
  setProfileToggleModal,
  handleUpdate,
}) => {
  return (
    <div
      className={`flex ${showEditForm ? "justify-between" : "justify-end"} `}
    >
      {showEditForm && (
        <button
          onClick={handleSignout}
          className="flex items-center gap-2 bg-red-100 px-3 py-2 text-red-700 font-semibold rounded-lg cursor-pointer"
        >
          <span>
            <IoLogOut />
          </span>
          Logout
        </button>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(setProfileToggleModal(false))}
          className="rounded-lg border-2 border-gray-300 px-3 py-2 cursor-pointer"
        >
          Close
        </button>
        {showEditForm && (
          <button
            onClick={handleUpdate}
            className="px-3 py-2 bg-gradient-to-r from-[#A259FF] to-[#6A11CB] rounded-lg text-white cursor-pointer"
          >
            Save changes
          </button>
        )}
      </div>
    </div>
  );
};

export const ProfileHeader = ({
  singleUserDetails,
  username,
  about,
  preview,
  showEditForm,
  fileInputRef,
  setPreview,
  setFile,
  handleClick,
}) => {
  return (
    <div className="w-full flex gap-[1rem] items-center">
      <button
        onClick={handleClick}
        className="w-[150px] h-[150px] overflow-hidden rounded-full border-2 relative group cursor-pointer"
      >
        {showEditForm && (
          <div className="bg-[rgb(0,0,0,0.6)] absolute w-full h-full flex items-center justify-center text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <input
              type="file"
              name="profile"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFile(file);
                  const previewUrl = URL.createObjectURL(file);
                  setPreview(previewUrl);
                }
              }}
            />
            <MdEdit />
          </div>
        )}

        <img src={preview} className="w-full h-full object-cover" />
      </button>
      <div className="flex flex-col gap-[1rem]">
        <div className="flex flex-col gap-0.5">
          <h5 className="text-2xl font-semibold">{username}</h5>
          <p className="text-gray-500 font-semibold">
            {singleUserDetails?.email}
          </p>
        </div>
        <p>{about}</p>
      </div>
    </div>
  );
};
