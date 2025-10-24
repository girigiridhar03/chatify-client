import React from "react";
import { Link } from "react-router-dom";

const Login = ({ loginDetails, handleLoginDetails, handleLogin }) => {
  return (
    <div className="bg-white shadow-lg w-[95%] md:w-[70%] lg:w-[50%] max-w-[500px] p-[1rem] mt-[8rem] border-2 border-gray-300 rounded-lg flex flex-col gap-[1rem] items-center mx-auto">
      <div>
        <h4 className="font-bold">Welcome Back!</h4>
      </div>
      <div className="flex-1 w-[100%]">
        <form
          onSubmit={handleLoginDetails}
          className="w-[90%] h-[100%] flex flex-col gap-[1.5rem] mx-auto"
        >
          <label htmlFor="email">
            <p className="font-semibold text-[15px] pl-2">Email</p>
            <input
              className="w-[100%] border-2 border-[#cfcfcf] text-[15px] rounded-2xl p-[10px]"
              type="email"
              name="email"
              value={loginDetails.email}
              onChange={handleLogin}
              id="email"
              placeholder="Enter you email"
            />
          </label>
          <label htmlFor="password">
            <p className="font-semibold text-[15px] pl-2">Password</p>
            <input
              className="w-[100%] border-2 border-[#cfcfcf] text-[15px] rounded-2xl p-[10px]"
              type="password"
              name="password"
              value={loginDetails.password}
              onChange={handleLogin}
              id="password"
              placeholder="Enter you Password"
            />
          </label>
          <div className="flex justify-end w-[100%]">
            <p className="text-[#1877F2] font-semibold text-[15px]">
              Forgot password
            </p>
          </div>
          <input
            type="submit"
            value="Sign in"
            className="bg-[#1877f2] p-[10px] text-white font-semibold text-[18px] rounded-2xl cursor-pointer"
          />
        </form>
      </div>
      <div>
        <p className="text-[15px]">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-[#1877f2]">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
