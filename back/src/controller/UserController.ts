import { Controller } from "../abstract/Controller";
import { Request, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { Student } from "../interfaces/comments";

require("dotenv").config();

export class UserController extends Controller {
  protected service: UserService;

  constructor() {
    super();
    this.service = new UserService();
  }

  public async findAll(req: Request, res: Response) {
    const response: resp<Array<DBResp<Student>> | undefined> = {
      code: 200,
      message: "",
      body: undefined,
    };

    try {
      const dbResp = await this.service.getAllStudents();
      if (dbResp) {
        response.body = dbResp;
        response.message = "Find success";
        res.send(response);
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      response.code = 500;
      response.message = "Server error";
      res.status(500).send(response);
    }
  }

  public async insertOne(req: Request, res: Response) {
    try {
      const resp = await this.service.insertOne(req.body);
      res.status(resp.code).send(resp);
    } catch (error) {
      res.status(500).send({ code: 500, message: "Server error" });
    }
  }
}