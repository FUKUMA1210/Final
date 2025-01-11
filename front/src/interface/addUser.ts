export interface AddUserRequest {
    username: string;
    password: string;
  }
  
  export interface AddUserResponse {
    message: string;
    user: {
      id: string;
      username: string;
      createdAt: string;
    };
  }
