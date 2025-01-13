import { createBrowserRouter } from "react-router";
import Landing from "../view/Landing";
import Login from "../view/Login";
import AddUser from "../view/AddUser";
import AddComment from "../view/AddComment";
import Comments from "../view/Comments";
import UpdateComment from "../view/UpdateComment";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/add-user',
        element: <AddUser />,
    },
    {
        path: '/add-comment',
        element: <AddComment />
    },
    {
        path: '/comments',
        element: <Comments />
    },
    {
        path: '/update-comment/:commentId',
        element: <UpdateComment />
    },
]);
