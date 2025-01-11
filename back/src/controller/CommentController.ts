import { Request, Response } from "express";
import { CommentService } from "../Service/CommentService";

export class CommentController {
  private service = new CommentService();

  async addComment(req: Request, res: Response) {
    try {
      const result = await this.service.addComment(req.body);
      res.status(result.code).json(result);
    } catch (error) {
      res.status(500).json({ code: 500, message: "Server error" });
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const result = await this.service.updateComment(commentId, req.body);
      res.status(result.code).json(result);
    } catch (error) {
      res.status(500).json({ code: 500, message: "Server error" });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const result = await this.service.deleteComment(commentId);
      res.status(result.code).json(result);
    } catch (error) {
      res.status(500).json({ code: 500, message: "Server error" });
    }
  }

  async getCommentsByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const result = await this.service.getCommentsByUsername(username);
      res.status(result.code).json(result);
    } catch (error) {
      res.status(500).json({ code: 500, message: "Server error" });
    }
  }
}