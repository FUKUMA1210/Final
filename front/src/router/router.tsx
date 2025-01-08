import { createHashRouter } from "react-router";
import App from '../view/App';
import Login from '../view/Login';

export const router = createHashRouter([
    {
        path: "/",
        element: <Login />,
    },
    //{
    //    path: '/Login',
    //    element: <Login />,
    //},
])