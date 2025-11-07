import {createRoot} from "react-dom/client"
import App from "./App"
import "./style/style.css"
import { Provider } from "react-redux"
import { store } from './component/store/store';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App></App>
        <Toaster></Toaster>
    </Provider>
)