import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const localStoredUser = JSON.parse(sessionStorage.getItem("user"));
  const user = userDetails || localStoredUser;

  if (
    !user ||
    Object.keys(user).length === 0 ||
    localStoredUser?._id !== user?._id
  ) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectRoute;
