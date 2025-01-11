import { Router, Request, Response } from "express";
import { CommentController } from "../controller/CommentController";
import { Route } from "../abstract/Route";

export class CommentRoute extends Route {

  protected url: string;
  protected Controller = new CommentController();

  constructor() {
      super()
      this.url = '/api/v1/comment/'
      this.setRoutes()
  }

  protected setRoutes(): void {

      this.router.post(`${this.url}addComment`, (req, res) => {
          this.Controller.addComment(req, res);
      })

      this.router.put(`${this.url}update/:commentId`, (req, res) => {
          this.Controller.updateComment(req, res);
      })

      this.router.delete(`${this.url}delete/:commentId`, (req, res) => {
          this.Controller.deleteComment(req, res);
      })

      this.router.get(`${this.url}user/:username`, (req, res) => {
          this.Controller.getCommentsByUsername(req, res);
      })
  }
}