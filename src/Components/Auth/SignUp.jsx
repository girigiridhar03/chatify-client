import React from "react";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
const SignUp = ({
  signupDetails,
  handleSignup,
  handleChange,
  fileInputRef,
  handleClick,
  setFile,
  setPreview,
  preview,
}) => {
  return (
    <div className="bg-white shadow-lg max-w-[750px] w-[95%] mt-[8rem] mx-auto rounded-lg  flex flex-col items-center py-[1.5rem] px-[2rem] gap-[1rem]">
      <div className="flex justify-end w-[100%]">
        <p className="font-semibold">
          Already a Member?{" "}
          <Link to={"/signin"}>
            <span className="text-[#1877f2]">Sign in</span>
          </Link>
        </p>
      </div>
      <h5 className="text-2xl font-semibold">Sign up</h5>
      <form
        className="w-[100%] flex flex-col gap-[1rem]"
        onSubmit={handleSignup}
      >
        <div className="flex justify-between w-[100%] gap-[18px]">
          <label htmlFor="username" className="w-[50%] flex flex-col gap-[5px]">
            <p className="font-semibold text-[15px] pl-2">Username</p>
            <input
              className="w-[100%] border-2 border-[#cfcfcf] text-[15px] rounded-2xl p-[10px]"
              type="text"
              name="username"
              value={signupDetails.username}
              onChange={handleChange}
              id="username"
              placeholder="Enter Username"
            />
          </label>

          <div className="w-[50%] flex items-center flex-col">
            <button
              type="button"
              onClick={handleClick}
              className="w-[70px] h-[70px] rounded-full flex items-center justify-center text-3xl bg-[#1877F2] text-white overflow-hidden"
            >
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
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-[100%] h-[100%] rounded-full object-cover"
                />
              )}
              <FaCamera />
            </button>
            <p className="text-[15px] font-semibold">Add Photo</p>
          </div>
        </div>
        <div className="flex justify-between w-[100%] gap-[18px]">
          <label htmlFor="email" className="w-[50%] flex flex-col gap-[5px]">
            <p className="font-semibold text-[15px] pl-2">Email</p>
            <input
              className="w-[100%] border-2 border-[#cfcfcf] text-[15px] rounded-2xl p-[10px]"
              type="email"
              name="email"
              value={signupDetails.email}
              onChange={handleChange}
              id="email"
              placeholder="Enter Email"
            />
          </label>

          <label htmlFor="password" className="w-[50%] flex flex-col gap-[5px]">
            <p className="font-semibold text-[15px] pl-2">Password</p>
            <input
              className="w-[100%] border-2 border-[#cfcfcf] text-[15px] rounded-2xl p-[10px]"
              type="password"
              name="password"
              value={signupDetails.password}
              onChange={handleChange}
              id="password"
              placeholder="Enter Password"
            />
          </label>
        </div>
        <div className="flex justify-between w-[100%] gap-[18px]">
          <label htmlFor="dob" className="w-[50%] flex flex-col gap-[5px]">
            <p className="font-semibold text-[15px] pl-2">Date of Birth</p>
            <input
              className="w-[100%] border-2 border-[#cfcfcf] text-[15px] rounded-2xl p-[10px]"
              type="date"
              name="dob"
              value={signupDetails.dob}
              onChange={handleChange}
              id="dob"
              placeholder="Enter D-O-B"
            />
          </label>

          <label className="w-[50%] flex flex-col gap-[9px]">
            <p className="font-semibold text-[15px] pl-2">Gender</p>
            <div className="flex items-center justify-start gap-[2rem]">
              <label htmlFor="male" className="flex flex-col items-center">
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  onChange={handleChange}
                  value="male"
                />
                <p className="font-semibold text-[15px]">Male</p>
              </label>
              <label htmlFor="female" className="flex flex-col items-center">
                <input
                  type="radio"
                  name="gender"
                  onChange={handleChange}
                  id="female"
                  value="female"
                />
                <p className="font-semibold text-[15px]">Female</p>
              </label>
            </div>
          </label>
        </div>
        <div className="w-[100%]">
          <label htmlFor="about" className="w-[100%] flex flex-col gap-[5px]">
            <p className="font-semibold text-[15px] pl-2">About</p>
            <textarea
              className="w-[100%] border-2 border-[#cfcfcf] text-[15px] rounded-2xl p-[10px]"
              name="about"
              value={signupDetails.about}
              onChange={handleChange}
              id="about"
              placeholder="Type here..."
              cols={2}
            />
          </label>
        </div>
        <div className="w-[100%] flex justify-center">
          <input
            type="submit"
            value="Submit"
            className="px-[1.5rem] py-[0.3rem] text-md cursor-pointer font-semibold rounded-2xl bg-[#1877f2] text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
