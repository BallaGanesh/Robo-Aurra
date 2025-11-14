import { createBrowserRouter } from "react-router-dom";
import Register from "../register/Register";
import Login from "../login/Login";
import Home from '../ui/pages/Home';
import Explore from './../ui/pages/Explore';

let routers = createBrowserRouter([{
    path:"/",
    // element:<Register></Register>
    element:<Home></Home>
}, {
    path:"/login",
    element:<Login></Login>
}, 
{
    path:"/Explore",
    element:<Explore></Explore>
}, 

])

export default routers;