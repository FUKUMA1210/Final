import bcrypt from "bcrypt";
import { usersModel } from "../orm/schemas/usersSchemas";
import { resp } from "../utils/resp";
import { generateToken, verifyToken } from "../utils/token";
import { logger } from "../middlewares/log";
import { Request } from "express";

export class AuthService {
  /**
   * 用戶註冊
   * @param data 包含 username 和 password 的對象
   */
  public async register(data: { username: string; password: string }): Promise<resp<string>> {
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

      const existingUser = await usersModel.findOne({ username });
      if (existingUser) {
        response.code = 400;
        response.message = "Username already exists";
        return response;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new usersModel({ username, password: hashedPassword });
      await newUser.save();

      response.message = "User registered successfully";
    } catch (error) {
      response.code = 500;
      response.message = "Server error";
      console.error("Error in register:", error);
    }

    return response;
  }

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
      if (!user || !(await bcrypt.compare(password, user.password))) {
        response.code = 400;
        response.message = "Invalid username or password";
        return response;
      }

      const token = generateToken(user._id, "user");
      response.body = token;
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
      const authHeader = Request.headers.authorization;
      if (!authHeader) {
        response.code = 400;
        response.message = "Token is required";
        return response;
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);

      if (!decoded) {
        response.code = 400;
        response.message = "Invalid token";
        return response;
      }

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
