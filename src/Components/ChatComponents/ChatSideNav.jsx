import React from "react";
import { CgMathPlus } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { UserCard } from "./utils/chat.utils";
const ChatSideNav = () => {
  return (
    <div className="w-[20%] h-[100%] py-[1rem] px-[0.9rem] flex flex-col gap-[1rem]">
      <header className="w-[100%] flex items-center justify-between">
        <h4 className="text-2xl font-bold">Chats</h4>
        <button className="bg-gradient-to-r from-[#A259FF] to-[#6A11CB] w-[30px] h-[30px] rounded-full text-white flex items-center justify-center text-xl cursor-pointer">
          <CgMathPlus />
        </button>
      </header>
      <div className=" flex items-center h-[35px] px-[10px] rounded-2xl bg-white shadow-lg gap-[.3rem]">
        <div>
          <div className="text-[#747272]">
            <IoSearch />
          </div>
        </div>
        <input type="text" name="" id="" className="flex-1 outline-0 placeholder:font-semibold" placeholder="Search..." />
      </div>

      <div>
        <UserCard />
      </div>
    </div>
  );
};

export default ChatSideNav;
