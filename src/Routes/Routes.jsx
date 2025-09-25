import { Route, Routes } from "react-router-dom";
import AuthComponent from "../Components/Auth/AuthComponent";
import MainLayout from "../Components/Main/MainLayout";
import ChatLayout from "../Components/ChatComponents/ChatLayout";

const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<ChatLayout />} />
      </Route>

      <Route path="/signin" element={<AuthComponent />} />
      <Route path="/signup" element={<AuthComponent />} />
    </Routes>
  );
};

export default AllRoutes;
