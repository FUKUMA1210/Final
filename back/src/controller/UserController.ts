import { Controller } from "../abstract/Controller";
import { Request, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";

export class UserController extends Controller {
  protected service: UserService;

  constructor() {
    super();
    this.service = new UserService();
  }

  /**
   * 取得使用者清單
   * @route GET /users
   */
  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.service.getAllUsers();
      const response: resp<DBResp<any>[]> = {
        code: 200,
        message: "Users fetched successfully",
        body: users,
      };
      res.status(200).send(response);
    } catch (error) {
      console.error("Error fetching all users:", error);
      const response: resp<null> = {
        code: 500,
        message: "Server error",
        body: null,
      };
      res.status(500).send(response);
    }
  }

  /**
   * 根據 ID 取得使用者資訊
   * @route GET /users/:id
   */
  public async getUserByID(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await this.service.getUserByID(userId);

      if (user) {
        const response: resp<DBResp<any>> = {
          code: 200,
          message: "User fetched successfully",
          body: user,
        };
        res.status(200).send(response);
      } else {
        const response: resp<null> = {
          code: 404,
          message: "User not found",
          body: null,
        };
        res.status(404).send(response);
      }
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      const response: resp<null> = {
        code: 500,
        message: "Server error",
        body: null,
      };
      res.status(500).send(response);
    }
  }

  /**
   * 新增使用者
   * @route POST /users
   */
  public async addUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        const response: resp<null> = {
          code: 400,
          message: "Username and password are required",
          body: null,
        };
        res.status(400).send(response);
        return;
      }

      const newUser = await this.service.addUser(username, password);
      const response: resp<DBResp<any>> = {
        code: 201,
        message: "User created successfully",
        body: newUser,
      };
      res.status(201).send(response);
    } catch (error) {
      console.error("Error adding user:", error);
      const response: resp<null> = {
        code: 500,
        message: "Server error",
        body: null,
      };
      res.status(500).send(response);
    }
  }
}