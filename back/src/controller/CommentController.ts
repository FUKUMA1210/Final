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

  public async addComment(Request: Request, Response: Response) {
    const resp = await this.service.addComment(Request.body);
    Response.status(resp.code).send(resp);
  }

  public async updateComment(Request: Request, Response: Response) {
    const resp = await this.service.updateComment(
      Request.params.commentId,
      Request.body
    );
    Response.status(resp.code).send(resp);
  }

  public async deleteComment(Request: Request, Response: Response) {
    const resp = await this.service.deleteComment(Request.params.commentId);
    Response.status(resp.code).send(resp);
  }

  public async getCommentsByUsername(Request: Request, Response: Response) {
    const resp = await this.service.getCommentsByUsername(Request.params.username);
    Response.status(resp.code).send(resp);
  }
}
