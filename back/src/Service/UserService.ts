import { Service } from "../abstract/Service";
import { Document } from "mongoose";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";
import { usersModel } from "../orm/schemas/usersSchemas";

export class UserService extends Service {
    // 查詢所有用戶
    public async getAllUsers(): Promise<resp<DBResp<Document>[] | undefined>> {
        const resp: resp<DBResp<Document>[] | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const users = await usersModel.find().select('-password_hash -__v');
            resp.body = users;
            resp.message = "Users retrieved successfully";
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in getAllUsers:", error);
        }
        return resp;
    }

    // 新增用戶
    public async addUser(data: { username: string; password: string }): Promise<resp<DBResp<Document> | undefined>> {
        const resp: resp<DBResp<Document> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const { username, password } = data;
            if (!username || !password) {
                resp.code = 400;
                resp.message = "Username and password are required";
                return resp;
            }

            const existingUser = await usersModel.findOne({ username });
            if (existingUser) {
                resp.code = 400;
                resp.message = "Username already exists";
                return resp;
            }

            const newUser = new usersModel({ username, password });
            await newUser.save();

            resp.message = "User added successfully";
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in addUser:", error);
        }
        return resp;
    }
}
