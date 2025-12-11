import { RouterProvider } from "react-router-dom";
import routers from "./component/routers/routes";
import { SocketProvider } from "./Socket/SocketProvider";
import { NotificationProvider } from "./Notifications/NotificationProvider";

const App = () => {
  return (
    <SocketProvider>
      <NotificationProvider>
        <RouterProvider router={routers} />
      </NotificationProvider>
    </SocketProvider>
  );
};

export default App;




