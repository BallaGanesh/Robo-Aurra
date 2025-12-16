import { createBrowserRouter } from "react-router-dom";
import Register from "../register/Register";
import Login from "../login/Login";
import Home from '../ui/pages/Home';
import Explore from './../ui/pages/Explore';
import Settings from './../ui/pages/Settings';
import Profile from './../ui/pages/Profile';
import Messages from "../ui/pages/Messages";
import NotFound from './../ui/pages/NotFound';
import LandingPg from "../ui/pages/LandingPg";
import NotificationsPage from './../ui/pages/notifications/NotificationPage';
import PrivateRoute from "./PrivateRoute";


let routers = createBrowserRouter([{
    path:"/",
    element:<LandingPg></LandingPg>
}, {
    path: '/Register',
    element:<Register></Register>
},{
    path:"/login",
    element:<Login></Login>
}, {
    path:"/Home",
    element:<PrivateRoute><Home></Home></PrivateRoute>
}, {
    path:"/Explore",
    element:<PrivateRoute><Explore></Explore></PrivateRoute>
  
}, {
    path:"/Settings",
    element:<PrivateRoute><Settings></Settings></PrivateRoute>
  
}, {
    path:"/Profile",
    element:<PrivateRoute><Profile></Profile></PrivateRoute>
   
}, {
    path:"/Messages",
    element:<PrivateRoute><Messages></Messages></PrivateRoute>
  
},{
    path:'/notifications',
    element:<PrivateRoute><NotificationsPage></NotificationsPage></PrivateRoute>
},
 {
    path:'*',
    element:<NotFound></NotFound>
}
])

export default routers;