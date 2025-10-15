import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleUserDetails,
  getUserDetails,
  signout,
  updateProfileDetails,
} from "../../../Store/Userslice/user.service";
import { useNavigate } from "react-router-dom";
import { setProfileToggleModal } from "../../../Store/Userslice/userslice";
import { Bounce, toast } from "react-toastify";
import { FooterButtons, InputFields, ProfileHeader } from "./chat.utils";

const ProfileModal = () => {
  const fileInputRef = useRef(null);
  const profileId = useSelector((state) => state?.authReducer?.profileId);
  const singleUserDetails = useSelector(
    (state) => state?.authReducer?.singleUserDetails
  );
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
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
    setPreview(singleUserDetails?.profilePic?.url);
  }, [singleUserDetails]);

  useEffect(() => {
    const value = userDetails?._id === singleUserDetails?._id;
    setShowEditForm(value);
  }, [userDetails, singleUserDetails]);

  const handleSignout = async () => {
    try {
      await dispatch(signout()).unwrap();
      localStorage.removeItem("user");
      toast.success("Logout successfully.");
      navigate("/signin");
    } catch (error) {
      console.log("error signout :", error);
    }
  };

  const handleUpdate = async () => {
    const obj = {};
    const formData = new FormData();

    if (username?.trim() === "" && username !== singleUserDetails?.username) {
      console.log("username", username);
      obj.username = username;
    }

    if (about?.trim() !== "" && about !== singleUserDetails?.about) {
      obj.about = about;
    }

    if (file) {
      formData.append("profilepic", file);
    }

    for (const [name, value] of Object.entries(obj)) {
      formData.append(name, value);
    }
    toast.success("Profile updated successfully🎉");
    await dispatch(updateProfileDetails(formData)).unwrap();
    await dispatch(getSingleUserDetails(profileId)).unwrap();
    await dispatch(getUserDetails()).unwrap();
  };

  return (
    <div className="w-full h-full fixed bg-[rgba(0,0,0,0.5)] top-0 left-0">
      <div className="bg-white w-[30%] rounded-xl shadow-lg p-4 relative flex flex-col gap-6 mx-auto mt-[10rem]">
        <h3 className="text-lg font-semibold">
          {showEditForm ? " Profile Details" : "Profile View"}
        </h3>
        <ProfileHeader
          singleUserDetails={singleUserDetails}
          username={username}
          about={about}
          preview={preview}
          showEditForm={showEditForm}
          fileInputRef={fileInputRef}
          setPreview={setPreview}
          setFile={setFile}
          handleClick={handleClick}
        />

        {showEditForm && (
          <InputFields
            username={username}
            about={about}
            singleUserDetails={singleUserDetails}
            setUsername={setUsername}
            setAbout={setAbout}
          />
        )}

        <FooterButtons
          showEditForm={showEditForm}
          handleSignout={handleSignout}
          dispatch={dispatch}
          setProfileToggleModal={setProfileToggleModal}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default ProfileModal;
