export const UserCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg px-3 py-2 w-full flex items-center justify-between">
      {/* Avatar */}
      <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-gray-200">
        <img
          src="https://res.cloudinary.com/dlbsvtq6c/image/upload/v1758503981/chatapp/images/ghp3hiem0nu9av5bozwy.jpg"
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name + Message */}
      <div className="flex-1 ml-3">
        <p className="font-semibold text-gray-900">Ankit Mishra</p>
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
