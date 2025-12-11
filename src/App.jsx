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


// import React from "react";
// import { RouterProvider } from "react-router-dom";
// import routers from "./component/routers/routes";
// import { SocketProvider } from "./Socket/SocketProvider";

// const App = () => {
//   return (
//     <SocketProvider>
//       <RouterProvider router={routers} />
//     </SocketProvider>
//   );
// };

// export default App;


