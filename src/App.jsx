
import { NotificationProvider } from "./Notifications/NotificationProvider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearTokenOnRefresh } from "./component/features/auth/AuthSlice";
import toast from "react-hot-toast";
import { SocketProvider } from "./Socket/SocketProvider";
import { RouterProvider } from "react-router-dom";
import routers from "./component/routers/routes";

const App = () => {
  const dispatch=useDispatch();
  useEffect(() => {
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