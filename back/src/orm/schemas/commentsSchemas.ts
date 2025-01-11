import { model, Schema } from "mongoose";
import { Comment } from "../../interfaces/comments";

export const commentsSchemas = new Schema<Comment>({
    text: { type: String, required: true }, 
    user: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const commentsModel = model<Comment>('comments', commentsSchemas);
