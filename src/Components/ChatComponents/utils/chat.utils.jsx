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
        <p className="font-semibold text-gray-900">
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
