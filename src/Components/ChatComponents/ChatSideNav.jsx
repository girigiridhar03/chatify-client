import React, { useEffect, useState } from "react";
import { CgMathPlus } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { UserCard } from "./utils/chat.utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../Store/ChatSlice/chat.service";
import { setToggleModal } from "../../Store/Userslice/userslice";
const ChatSideNav = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state?.chatReducer?.chats);
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchChats(searchValue));
  }, [searchValue]);

  return (
    <div className="w-[20%] h-[100%] py-[1rem] px-[0.9rem] flex flex-col gap-[1rem] bg-[#F5F5F5] shadow-md rounded-lg">
      {/* Header */}
      <header className="w-[100%] flex items-center justify-between">
        <h4 className="text-2xl font-bold">Chats</h4>
        <button
          onClick={() => dispatch(setToggleModal(true))}
          className="bg-gradient-to-r from-[#A259FF] to-[#6A11CB] w-[30px] h-[30px] rounded-full text-white flex items-center justify-center text-xl cursor-pointer"
        >
          <CgMathPlus />
        </button>
      </header>

      {/* Search */}
      <div className=" flex items-center h-[35px] px-[10px] rounded-2xl bg-white shadow-lg gap-[.3rem]">
        <div>
          <div className="text-[#747272]">
            <IoSearch />
          </div>
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 outline-0 placeholder:font-semibold"
          placeholder="Search..."
        />
      </div>

      {/* UserCards */}
      <div className="flex flex-col gap-[1rem]">
        {chats?.chats?.map((chat) => (
          <UserCard
            key={chat?._id}
            chat={chat}
            loggedInUser={userDetails?._id}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatSideNav;
