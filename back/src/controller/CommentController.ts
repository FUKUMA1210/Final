import { Request, Response } from 'express';
import { CommentModel } from '../models/Comment';

import { Request, Response } from "express";
import { CommentService } from "./CommentService";

export class CommentController {
  private commentService = new CommentService();

  // 新增留言
  async addComment(req: Request, res: Response) {
    try {
      const comment = await this.commentService.createComment(req.body);
      res.status(201).json({ success: true, comment });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // 更新留言
  async updateComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const { message } = req.body;

      const updatedComment = await this.commentService.updateComment(commentId, message);
      res.status(200).json({ success: true, updatedComment });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // 刪除留言
  async deleteComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;

      const result = await this.commentService.deleteComment(commentId);
      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // 查詢所有留言
  async getAllComments(req: Request, res: Response) {
    try {
      const comments = await this.commentService.getAllComments();
      res.status(200).json({ success: true, comments });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // 查詢單一留言
  async getCommentById(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const comment = await this.commentService.getCommentById(commentId);
      res.status(200).json({ success: true, comment });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}
