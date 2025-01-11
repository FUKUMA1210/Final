import { usersModel } from "../orm/schemas/usersSchemas";
import { resp } from "../utils/resp";
import { logger } from "../middlewares/log";
import { Request } from "express";

export class AuthService {

  /**
   * 用戶登入
   * @param data 包含 username 和 password 的對象
   */
  public async login(data: { username: string; password: string }): Promise<resp<string>> {
    const response: resp<string> = {
      code: 200,
      message: "",
      body: "",
    };

    try {
      const { username, password } = data;

      if (!username || !password) {
        response.code = 400;
        response.message = "Username and password are required";
        return response;
      }

      const user = await usersModel.findOne({ username });
      if (!user || user.password !== password) {
        response.code = 400;
        response.message = "Invalid username or password";
        return response;
      }

      response.message = "Login succeeded";
    } catch (error) {
      response.code = 500;
      response.message = "Server error";
      console.error("Error in login:", error);
    }

    return response;
  }

  /**
   * 用戶登出
   * @param Request Express 的請求對象
   */
  public async logout(Request: Request): Promise<resp<string>> {
    const response: resp<string> = {
      code: 200,
      message: "",
      body: "",
    };

    try {
      response.message = "Logout succeeded";
      logger.info(`User logged out successfully`);
    } catch (error) {
      response.code = 500;
      response.message = "Server error";
      console.error("Error in logout:", error);
    }

    return response;
  }
}
