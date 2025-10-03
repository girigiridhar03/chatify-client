import React from "react";
import AllRoutes from "./Routes/Routes";
import { Bounce, ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <AllRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default App;
