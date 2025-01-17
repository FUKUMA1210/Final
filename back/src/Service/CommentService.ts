import { CommentsModel } from "../orm/schemas/commentsSchemas";

export class CommentService {
  async addComment(username: string, text: string) {
    try {
      const newComment = await CommentsModel.create({ username, text });
      return { code: 201, message: "Comment added", body: newComment };
    } catch (error) {
      console.error("Error in addComment:", error);
      return { code: 500, message: "Server error", body: null };
    }
  }

  async updateComment(commentId: string, text: string) {
    try {
      const updatedComment = await CommentsModel.findByIdAndUpdate(
        commentId,
        { text },
        { new: true }
      );
      if (!updatedComment) return { code: 404, message: "Comment not found", body: null };
      return { code: 200, message: "Comment updated", body: updatedComment };
    } catch (error) {
      console.error("Error in updateComment:", error);
      return { code: 500, message: "Server error", body: null };
    }
  }

  async deleteComment(commentId: string) {
    try {
      const deletedComment = await CommentsModel.findByIdAndDelete(commentId);
      if (!deletedComment) return { code: 404, message: "Comment not found", body: null };
      return { code: 200, message: "Comment deleted", body: null };
    } catch (error) {
      console.error("Error in deleteComment:", error);
      return { code: 500, message: "Server error", body: null };
    }
  }

  async getCommentsByUsername(username: string) {
    try {
      const comments = await CommentsModel.find({ username });
      if (comments.length === 0) return { code: 404, message: "No comments found for this user", body: null };
      return { code: 200, message: "Comments retrieved", body: comments };
    } catch (error) {
      console.error("Error in getCommentsByUsername:", error);
      return { code: 500, message: "Server error", body: null };
    }
  }
}
