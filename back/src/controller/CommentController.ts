import { Controller } from "../abstract/Controller";
import { Request, Response } from "express";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { CommentService } from "../Service/CommentService";
require('dotenv').config();

export class CommentController extends Controller {
  protected service: CommentService;

  constructor() {
    super();
    this.service = new CommentService();
  }

  public async addComment(req: Request, res: Response) {
    try {
      const username = req.body.username || "anonymous";
      const text = req.body.text;

      if (!username || !text) {
        return res.status(400).send({ code: 400, message: "Username and text are required", body: null });
      }

      const resp = await this.service.addComment(username, text);
      res.status(resp.code).send(resp);
    } catch (error) {
      res.status(500).send({ code: 500, message: "Server error", body: null });
    }
  }

  public async updateComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const { text } = req.body;

      if (!text) {
        return res.status(400).send({ code: 400, message: "Text is required", body: null });
      }

      const resp = await this.service.updateComment(commentId, text);
      res.status(resp.code).send(resp);
    } catch (error) {
      res.status(500).send({ code: 500, message: "Server error", body: null });
    }
  }

  public async deleteComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const resp = await this.service.deleteComment(commentId);
      res.status(resp.code).send(resp);
    } catch (error) {
      res.status(500).send({ code: 500, message: "Server error", body: null });
    }
  }

  public async getCommentsByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const resp = await this.service.getCommentsByUsername(username);
      res.status(resp.code).send(resp);
    } catch (error) {
      res.status(500).send({ code: 500, message: "Server error", body: null });
    }
  }
}
