
import { NotificationProvider } from "./Notifications/NotificationProvider";
import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./component/routers/routes";
import { SocketProvider } from "./Socket/SocketProvider";
import { useDispatch } from "react-redux";
import { clearTokenOnRefresh } from "./component/features/auth/AuthSlice";
import toast from "react-hot-toast";

const App = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    // Remove token on page refresh
    dispatch(clearTokenOnRefresh());
    toast.error("cleared token on refresh page")
  }, []);
  return (
    <SocketProvider>
      <NotificationProvider>
        <RouterProvider router={routers} />
      </NotificationProvider>
    </SocketProvider>
  );
};

export default App;




