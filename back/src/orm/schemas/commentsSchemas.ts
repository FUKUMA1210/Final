import { model, Schema } from "mongoose";
import { Comment } from "../../interfaces/comments";

export const commentsSchemas = new Schema<Comment>({
  text: { type: String, required: true },
  username: { type: String, required: true }, 
  timestamp: { type: Date, default: Date.now }, 
});

export const CommentsModel = model<Comment>("comments", commentsSchemas);
