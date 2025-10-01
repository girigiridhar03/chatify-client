import ChatSideNav from "./ChatSideNav";
import ChatContainer from "./ChatContainer";
import ChatRightNav from "./ChatRightNav";
import ChatTopBar from "./ChatTopBar";
import { useDispatch, useSelector } from "react-redux";
import { SearchCards } from "./utils/chat.utils";
import { accessChat, fetchChats } from "../../Store/ChatSlice/chat.service";
import ChatGroupModal from "./ChatGroupModal";

const ChatLayout = () => {
  const usersBySearch = useSelector(
    (state) => state?.authReducer?.usersBySearch
  );
  const toggleModalVal = useSelector(
    (state) => state?.authReducer?.toggleModalVal
  );

  const dispatch = useDispatch();

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
    <div className="flex flex-col gap-[1rem] h-[100vh] overflow-hidden px-[1rem] py-[0.5rem] relative">
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
      <div className=" w-[100%] h-[93%] flex gap-[1rem]">
        <ChatSideNav />
        <ChatContainer />
        <ChatRightNav />
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
    </div>
  );
};

export default ChatLayout;
