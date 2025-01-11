import { Router, Request, Response } from "express";
import { Route } from "../abstract/Route"
import { AuthController } from "../controller/AuthController";

export class AuthRoute extends Route {

  protected url: string;
  protected Controller = new AuthController();

  constructor() {
      super()
      this.url = '/api/v1/auth/'
      this.setRoutes()
  }

  protected setRoutes(): void {

      this.router.post(`${this.url}register`, (req, res) => {
          this.Controller.register(req, res);
      })

      this.router.post(`${this.url}login`, (req, res) => {
          this.Controller.login(req, res);
      })
      this.router.post(`${this.url}logout`, (req, res) => {
        this.Controller.logout(req, res);
    })
  }
}