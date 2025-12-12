import { RouterProvider } from "react-router-dom";
import routers from "./component/routers/routes";
import { SocketProvider } from "./Socket/SocketProvider";
import { NotificationProvider } from "./Notifications/NotificationProvider";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearTokenOnRefresh } from "./component/features/auth/AuthSlice";

const App = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    // Removes token on page refresh
    dispatch(clearTokenOnRefresh());
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