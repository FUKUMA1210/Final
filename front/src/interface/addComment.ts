export interface AddCommentRequest {
    username: string;
    message: string;
  }
  
  export interface AddCommentResponse {
    message: string;
    comment: {
      id: string;
      username: string;
      message: string;
      createdAt: string;
    };
  }
