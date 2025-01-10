import { Comment } from "./CommentModel";

import { Comment } from "./CommentModel";

export class CommentService {
  // 新增留言
  async createComment(commentData: { username: string; message: string; postId: string }) {
    const { username, message, postId } = commentData;

    if (!message || !postId) {
      throw new Error("缺少必要的留言資料");
    }

    const newComment = new Comment({
      username,
      message,
      postId,
      createdAt: new Date(),
    });

    return await newComment.save();
  }

  // 更新留言
  async updateComment(commentId: string, newMessage: string) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("留言不存在");
    }

    // 更新留言內容
    comment.message = newMessage;
    comment.updatedAt = new Date();
    return await comment.save();
  }

  // 刪除留言
  async deleteComment(commentId: string) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("留言不存在");
    }

    // 刪除留言
    await Comment.findByIdAndDelete(commentId);
    return { message: "留言已刪除", commentId };
  }
}

