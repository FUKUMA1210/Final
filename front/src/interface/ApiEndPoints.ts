export interface AuthApiEndpoints {
    base: string;
    login: string;
    logout: string;
}

export interface UserApiEndpoints {
    base: string;
    addUser: string;
    getAllUsers: string;
}

export interface CommentApiEndpoints {
    base: string;
    addComment: string;
    updateComment: string;
    deleteComment: string;
    getCommentsByUsername: string;
}
