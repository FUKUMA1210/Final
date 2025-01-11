export interface Comment {
    id: string;
    username: string;
    message: string;
    createdAt: string;
  }
  
  export type GetUserCommentsResponse = Comment[];
