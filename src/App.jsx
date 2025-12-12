
import { NotificationProvider } from "./Notifications/NotificationProvider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearTokenOnRefresh } from "./component/features/auth/AuthSlice";
import toast from "react-hot-toast";

const App = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(clearTokenOnRefresh());
    toast.error("Token cleared on refresh page")
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