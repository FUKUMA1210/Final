import { Controller } from "../abstract/Controller";
import { Request, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";

require('dotenv').config()

export class UserController extends Controller {
  protected service: UserService;

  constructor() {
      super();
      this.service = new UserService();
  }

  public async addUser(Request: Request, Response: Response) {
      const resp = await this.service.addUser(Request.body)
      Response.status(resp.code).send(resp)
  }

  public async getAllUsers(Request: Request, Response: Response) {
      const resp = await this.service.getAllUsers()
      Response.status(resp.code).send(resp)
  }
}