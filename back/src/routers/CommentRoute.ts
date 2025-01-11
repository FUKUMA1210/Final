import express from "express";
import { CommentController } from "../controller/CommentController";

const router = express.Router();
const commentController = new CommentController();
router.post("/", commentController.addComment.bind(commentController));
router.put("/:commentId", commentController.updateComment.bind(commentController));
router.delete("/:commentId", commentController.deleteComment.bind(commentController));
router.get("/user/:username", commentController.getCommentsByUsername.bind(commentController));

export default router;
