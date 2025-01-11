export enum api{
    login = "http://localhost:7777/api/v1/auth/login",
    logout ="http://localhost:7777/api/v1/auth/logout",
    addUser ="http://localhost:7777/api/v1/auth/addUser",
    getAllUsers ="http://localhost:7777/api/v1/auth/getAllUsers",
    addComment ="http://localhost:7777/api/v1/comment/addComment",
    updateComment ="http://localhost:7777/api/v1/comment/update/:commentId",
    deleteComment ="http://localhost:7777/api/v1/comment/delete/:commentId",
    username ="http://localhost:7777/api/v1/comment/user/:username"
}