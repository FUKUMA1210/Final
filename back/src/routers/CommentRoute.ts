import express from "express";
import { CommentController } from "./CommentController";

const router = express.Router();
const commentController = new CommentController();

// 新增留言
router.post("/", commentController.addComment.bind(commentController));

// 更新留言
router.put("/:commentId", commentController.updateComment.bind(commentController));

// 刪除留言
router.delete("/:commentId", commentController.deleteComment.bind(commentController));

// 查詢所有留言
router.get("/", commentController.getAllComments.bind(commentController));

// 查詢單一留言
router.get("/:commentId", commentController.getCommentById.bind(commentController));

export default router;
