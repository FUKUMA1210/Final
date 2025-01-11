export interface UpdateCommentRequest {
    message: string;
  }
  
  export interface UpdateCommentResponse {
    message: string;
    comment: {
      id: string;
      username: string;
      message: string;
      updatedAt: string;
    };
  }
