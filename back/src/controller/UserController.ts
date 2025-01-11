import { Controller } from "../abstract/Controller";
import { Request, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";

require("dotenv").config();

export class UserController extends Controller {
  protected service: UserService;

  constructor() {
    super();
    this.service = new UserService();
  }

  /**
   * 取得使用者清單
   */
  public async getAllUsers(req: Request, res: Response) {
    try {
      const result: DBResp = await this.service.getAllUsers();
      res.status(result.code).send(result);
    } catch (error) {
      res.status(500).send(resp(false, "Server error", null));
    }
  }

  /**
   * 根據 ID 取得使用者資訊
   */
  public async getUserByID(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const result: DBResp = await this.service.getUserByID(userId);
      res.status(result.code).send(result);
    } catch (error) {
      res.status(500).send(resp(false, "Server error", null));
    }
  }

  /**
   * 新增使用者
   */
  public async addUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const result: DBResp = await this.service.addUser(userData);
      res.status(result.code).send(result);
    } catch (error) {
      res.status(500).send(resp(false, "Server error", null));
    }
  }
}
