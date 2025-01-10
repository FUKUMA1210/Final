import { Request, Response } from "express";
import { CommentService } from "../services/CommentService";

export class CommentController {
    private service = new CommentService();

    async addComment(req: Request, res: Response) {
        const result = await this.service.addComment(req.body);
        res.status(result.code).json(result);
    }

    async updateComment(req: Request, res: Response) {
        const { commentId } = req.params;
        const result = await this.service.updateComment(commentId, req.body);
        res.status(result.code).json(result);
    }

    async deleteComment(req: Request, res: Response) {
        const { commentId } = req.params;
        const result = await this.service.deleteComment(commentId);
        res.status(result.code).json(result);
    }

    async getCommentsByUsername(req: Request, res: Response) {
        const { username } = req.params;
        const result = await this.service.getCommentsByUsername(username);
        res.status(result.code).json(result);
    }
}
