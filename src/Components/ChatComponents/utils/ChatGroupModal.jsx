import { useDispatch, useSelector } from "react-redux";
import {
  resetStates,
  setGroupSearchValue,
  setToggleModal,
} from "../../../Store/Userslice/userslice";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { createGroup } from "../../../Store/ChatSlice/chat.service";
import { groupSearch } from "../../../Store/Userslice/user.service";
import { SearchCards } from "./chat.utils";

const ChatGroupModal = ({
  headingName,
  searchValue,
  buttonName,
  buttonColor,
  placeHolderOne,
  placeHolderTwo,
}) => {
  const groupSearchValue = useSelector(
    (state) => state?.authReducer?.groupSearchValue
  );
  const groupSearchUsers = useSelector(
    (state) => state?.authReducer?.groupSearchUsers
  );

  const [tags, setTags] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [chatName, setChatName] = useState("");
  const [groupSearchData, setGroupSearchData] = useState([]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(groupSearch({ searchValue: groupSearchValue, page }));
  }, [groupSearchValue, page]);

  useEffect(() => {
    if (groupSearchUsers?.length === 0) return setGroupSearchData([]);
    setGroupSearchData((prev) => [...prev, ...groupSearchUsers]);
  }, [groupSearchUsers]);

  const handleTags = (user) => {
    setTags((prev) => [...prev, { id: user?._id, username: user?.username }]);
    setSelectedIds((prev) => [...prev, user?._id]);
  };

  const handleRemoveTag = (id) => {
    const updatedTags = tags.filter((tag) => tag?.id !== id);
    const updatedIds = selectedIds.filter((item) => item !== id);

    setTags(updatedTags);
    setSelectedIds(updatedIds);
  };

  const handleAction = () => {
    if (!chatName || !tags || !tags?.length === 0) return;
    dispatch(createGroup({ chatName, users: tags?.map((item) => item?.id) }));
  };

  const handleScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const remainingScroll = scrollHeight - (scrollTop + clientHeight);
    console.log(remainingScroll < 20);
    if (remainingScroll < 2) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-full fixed bg-[rgba(0,0,0,0.5)] top-0 left-0">
      <div className="bg-white w-[30%] rounded-xl shadow-lg p-4 relative flex flex-col gap-6 mx-auto mt-[10rem]">
        <button
          onClick={() => {
            dispatch(setToggleModal(false));
            dispatch(setGroupSearchValue(""));
            setGroupSearchData([]);
            dispatch(resetStates());
          }}
          className="absolute right-4 text-xl cursor-pointer"
        >
          <IoCloseSharp />
        </button>

        <h4 className="text-center text-3xl font-semibold">{headingName}</h4>

        {/* Inputs */}
        <div className="flex flex-col gap-6">
          <input
            className="w-full border-2 border-[#cfcfcf] text-[15px] rounded-xl p-2.5 placeholder:font-semibold"
            type="text"
            placeholder={placeHolderOne}
            onChange={(e) => setChatName(e.target.value)}
          />
          <input
            className="w-full border-2 border-[#cfcfcf] text-[15px] rounded-xl p-2.5 placeholder:font-semibold"
            type="text"
            value={searchValue}
            placeholder={placeHolderTwo}
            onChange={(e) =>
              dispatch(setGroupSearchValue(e.target.value?.trim()))
            }
          />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex w-full flex-wrap gap-2">
            {tags.map((tag) => {
              return (
                <div
                  key={tag?.id}
                  className="bg-gradient-to-r from-[#A259FF] to-[#6A11CB] flex items-center gap-1 p-1 w-auto text-white rounded-lg"
                >
                  <p className="truncate max-w-[70px]">{tag?.username}</p>
                  <span
                    onClick={() => handleRemoveTag(tag?.id)}
                    className="cursor-pointer"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Dropdown */}
        {groupSearchData?.length > 0 && (
          <div className="w-full">
            <div
              onScroll={handleScroll}
              className="bg-white shadow-lg rounded-lg w-full mx-auto max-h-[300px] overflow-auto p-4 flex flex-col gap-3"
            >
              {groupSearchData.map((user) => (
                <SearchCards
                  key={user?._id}
                  user={user}
                  handleAccessChat={handleTags}
                  bgcolor="bg-gray-300"
                  hideId={selectedIds}
                />
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Button */}
        <div className="flex justify-end">
          <button
            className={`${buttonColor} text-white px-4 py-2 rounded-lg font-semibold cursor-pointer`}
            onClick={() => handleAction()}
          >
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatGroupModal;
