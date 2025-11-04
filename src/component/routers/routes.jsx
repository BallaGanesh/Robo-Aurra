import { createBrowserRouter } from "react-router-dom";
import Register from "../register/Register";
import Login from "../login/Login";

let routers=createBrowserRouter([{
    path:"/",
    element:<Register></Register>
},
{
    path:"/login",
    element:<Login></Login>
}


])

export default routers