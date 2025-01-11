import { Controller } from "../abstract/Controller";
import { Request, Response } from "express";
import { AuthService } from "../Service/AuthService";

require("dotenv").config();

export class AuthController extends Controller {
  protected service: AuthService;

  constructor() {
      super();
      this.service = new AuthService();
  }

  public async login(Request: Request, Response: Response) {
      const resp = await this.service.login(Request.body)
      Response.status(resp.code).send(resp)
  }

  public async logout(Request: Request, Response: Response) {
    const resp = await this.service.logout(Request)
    Response.status(resp.code).send(resp)
  }
}