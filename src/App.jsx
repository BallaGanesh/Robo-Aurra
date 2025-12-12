
import { NotificationProvider } from "./Notifications/NotificationProvider";
<<<<<<< HEAD

=======
>>>>>>> 518ff696f7d9bce246d56ed3ae0506203b80ec3a
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