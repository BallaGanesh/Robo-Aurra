import { createBrowserRouter } from "react-router-dom";
import Register from "../register/Register";
import Login from "../login/Login";
import Home from "../home/Home";

let routers=createBrowserRouter([{
    path:"/",
    element:<Register></Register>
},
{
    path:"/login",
    element:<Login></Login>
},{
    path:"/home",
    element:<Home></Home>
}


])

export default routers