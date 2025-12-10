

import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./component/routers/routes";
import { SocketProvider } from "./Socket/SocketProvider";
import { useDispatch } from "react-redux";
import { clearTokenOnRefresh } from "./component/features/auth/AuthSlice";

const App = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    // Remove token on page refresh
    dispatch(clearTokenOnRefresh());
  }, []);
  return (
    <SocketProvider>
      <RouterProvider router={routers} />
    </SocketProvider>
  );
};

export default App;


