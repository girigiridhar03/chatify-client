import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleUserDetails,
  signout,
} from "../../Store/Userslice/user.service";
import { IoLogOut } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProfileModal = () => {
  const fileInputRef = useRef(null);
  const profileId = useSelector((state) => state?.authReducer?.profileId);
  const singleUserDetails = useSelector(
    (state) => state?.authReducer?.singleUserDetails
  );
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (!profileId) return;
    dispatch(getSingleUserDetails(profileId));
  }, [profileId]);

  useEffect(() => {
    setAbout(singleUserDetails?.about);
    setUsername(singleUserDetails?.username);
  }, [singleUserDetails]);

  useEffect(() => {
    const value = userDetails?._id === singleUserDetails?._id;
    setShowEditForm(value);
  }, [userDetails, singleUserDetails]);

  const handleSignout = async () => {
    try {
      await dispatch(signout()).unwrap();

      navigate("/signin");
    } catch (error) {
      console.log("error signout :", error);
    }
  };

  return (
    <div className="w-full h-full fixed bg-[rgba(0,0,0,0.5)] top-0 left-0">
      <div className="bg-white w-[30%] rounded-xl shadow-lg p-4 relative flex flex-col gap-6 mx-auto mt-[10rem]">
        <div className="w-full flex gap-[1rem] items-center">
          <button
            onClick={handleClick}
            className="w-[150px] h-[150px] overflow-hidden rounded-full border-2 relative group"
          >
            {!showEditForm && (
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
                    }
                  }}
                />
                <MdEdit />
              </div>
            )}

            <img
              src={singleUserDetails?.profilePic?.url}
              className="w-full h-full object-cover"
            />
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

        {showEditForm && (
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
        )}

        <div
          className={`flex ${
            showEditForm ? "justify-between" : "justify-end"
          } `}
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
            <button className="rounded-lg border-2 border-gray-300 px-3 py-2 cursor-pointer">
              Close
            </button>
            {showEditForm && (
              <button className="px-3 py-2 bg-gradient-to-r from-[#A259FF] to-[#6A11CB] rounded-lg text-white cursor-pointer">
                Save changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
