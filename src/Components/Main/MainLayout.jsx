import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUserDetails } from "../../Store/Userslice/user.service";

const MainLayout = () => {
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const isLoggedIn = useSelector((state) => state?.authReducer?.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(userDetails).length === 0) {
      dispatch(getUserDetails());
    }
  }, [userDetails, dispatch, isLoggedIn]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
