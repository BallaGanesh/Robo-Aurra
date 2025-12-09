// import React from 'react'
// import { RouterProvider } from 'react-router-dom'
// import routers from './component/routers/routes'

// const App = () => {
//   return (
// <RouterProvider router={routers}></RouterProvider>
//   )
// }

// export default App

import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./component/routers/routes";
import { SocketProvider } from "./Socket/SocketProvider";

const App = () => {
  return (
    <SocketProvider>
      <RouterProvider router={routers} />
    </SocketProvider>
  );
};

export default App;


