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
    element:<Home></Home>
}, {
    path:"/Explore",
    element:<Explore></Explore>
}, {
    path:"/Settings",
    element:<Settings></Settings>
}, {
    path:"/Profile",
    element: <Profile></Profile>
}, {
    path:"/Messages",
    element:<Messages></Messages>
}, {
    path:'/notifications',
    element:<NotificationsPage></NotificationsPage>
},
 {
    path:'*',
    element:<NotFound></NotFound>
}
])

export default routers;