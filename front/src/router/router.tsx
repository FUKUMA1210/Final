import { createHashRouter } from "react-router";
import Login from '../view/Login';
import Frontpage from '../view/Frontpage';
import Register from '../view/register'
import MessageBoard from '../view/MessageBoard';

export const router = createHashRouter([
    {
        path: "/",
        element: <Frontpage />,
    },
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/Register",
        element: <Register />,
    },
    {
        path: "/MessageBoard",
        element: <MessageBoard />,
    },
])