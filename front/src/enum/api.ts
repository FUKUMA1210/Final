import { AuthApiEndpoints, CommentApiEndpoints, UserApiEndpoints } from "../interface/ApiEndPoints";

export const comment_api: CommentApiEndpoints = {
    base: import.meta.env.VITE_COMMENT_API_BASE_URL,
    addComment: `${import.meta.env.VITE_COMMENT_API_BASE_URL}/addComment`,
    updateComment: `${import.meta.env.VITE_COMMENT_API_BASE_URL}/update/:commentId`,
    deleteComment: `${import.meta.env.VITE_COMMENT_API_BASE_URL}/delete/:commentId`,
    getCommentsByUsername: `${import.meta.env.VITE_COMMENT_API_BASE_URL}/user/:username`
};

export const auth_api: AuthApiEndpoints = {
    base: import.meta.env.VITE_AUTH_API_BASE_URL,
    login: `${import.meta.env.VITE_AUTH_API_BASE_URL}/login`,
    logout: `${import.meta.env.VITE_AUTH_API_BASE_URL}/logout`
};

export const user_api: UserApiEndpoints = {
    base: import.meta.env.VITE_USER_API_BASE_URL,
    addUser: `${import.meta.env.VITE_USER_API_BASE_URL}/addUser`,
    getAllUsers: `${import.meta.env.VITE_USER_API_BASE_URL}/getAllUsers`
};
