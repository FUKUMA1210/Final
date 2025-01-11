import { usersModel } from "../orm/schemas/usersSchemas";
import { DBResp } from "../interfaces/DBResp";

export class UserService {
  /**
   * 取得所有使用者
   * @returns 使用者清單
   */
  public async getAllUsers(): Promise<DBResp<any>[]> {
    try {
      const users = await usersModel.find();
      return users.map(user => ({
        ...user.toObject(),
        _id: user._id.toString(),
      })) as DBResp<any>[];
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Database error");
    }
  }

  /**
   * 根據 ID 取得使用者資訊
   * @param id 使用者 ID
   * @returns 單一使用者資訊
   */
  public async getUserByID(id: string): Promise<DBResp<any> | null> {
    try {
      const user = await usersModel.findById(id);
      if (!user) return null;
      return {
        ...user.toObject(),
        _id: user._id.toString(),
      } as DBResp<any>;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  }

  /**
   * 新增使用者
   * @param username 使用者名稱
   * @param password 密碼
   * @returns 新增結果
   */
  public async addUser(username: string, password: string): Promise<DBResp<any>> {
    try {
      const existingUser = await usersModel.findOne({ username });
      if (existingUser) throw new Error("Username already exists");

      const newUser = new usersModel({ username, password });
      const savedUser = await newUser.save();
      return {
        ...savedUser.toObject(),
        _id: savedUser._id.toString(),
      } as DBResp<any>;
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Failed to add user");
    }
  }

  /**
   * 實作抽象方法 handleRequest
   * @param req 
   * @returns 
   */
  public handleRequest(req: any): any {
    console.log("Handle request:", req);
    return { message: "Handled request" };
  }
}
