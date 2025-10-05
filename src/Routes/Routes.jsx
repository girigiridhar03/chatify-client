import { Route, Routes } from "react-router-dom";
import AuthComponent from "../Components/Auth/AuthComponent";
import MainLayout from "../Components/Main/MainLayout";
import ChatLayout from "../Components/ChatComponents/ChatLayout";
import ProtectRoute from "../Components/ProtectRoute/ProtectRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectRoute>
            <MainLayout />
          </ProtectRoute>
        }
      >
        <Route path="/" element={<ChatLayout />} />
      </Route>

      <Route path="/signin" element={<AuthComponent />} />
      <Route path="/signup" element={<AuthComponent />} />
    </Routes>
  );
};

export default AllRoutes;
