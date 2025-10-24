import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getUserDetails,
  signin,
  signup,
} from "../../Store/Userslice/user.service";
import Login from "./Login";
import SignUp from "./SignUp";
const AuthComponent = () => {
  const fileInputRef = useRef(null);
  const { pathname } = useLocation();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({
    username: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    about: "",
  });
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const [name, value] of Object.entries(signupDetails)) {
      formData.append(name, value);
    }

    if (file) {
      formData.append("profilepic", file);
    }
    dispatch(signup(formData));
    setSignupDetails({
      username: "",
      email: "",
      password: "",
      dob: "",
      gender: "",
      about: "",
    });
    setPreview(null);
    setFile(null);
  };

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginDetails = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(signin(loginDetails)).unwrap();
      console.log(result);
      if (result.success) {
        const user = await dispatch(getUserDetails()).unwrap();
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100%] h-[100vh] bg-gradient-to-r from-[#A259FF] to-[#6A11CB] border-2">
      {pathname === "/signin" && (
        <Login
          loginDetails={loginDetails}
          handleLoginDetails={handleLoginDetails}
          handleLogin={handleLogin}
        />
      )}

      {pathname === "/signup" && (
        <SignUp
          signupDetails={signupDetails}
          handleSignup={handleSignup}
          handleChange={handleChange}
          fileInputRef={fileInputRef}
          handleClick={handleClick}
          setFile={setFile}
          setPreview={setPreview}
          preview={preview}
        />
      )}
    </div>
  );
};

export default AuthComponent;
