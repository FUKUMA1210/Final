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

  public async register(req: Request, res: Response) {
    try {
      const resp = await this.service.register(req.body);
      res.status(resp.code).send(resp);
    } catch (error) {
      res.status(500).send({ code: 500, message: "Server error" });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const resp = await this.service.login(req.body);
      res.status(resp.code).send(resp);
    } catch (error) {
      res.status(500).send({ code: 500, message: "Server error" });
    }
  }
}