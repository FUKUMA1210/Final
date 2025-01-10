import bcrypt from "bcrypt";
import { Service } from "../abstract/Service";
import { usersModel } from "../orm/schemas/usersSchemas";
import { adminsModel } from "../orm/schemas/adminsSchemas";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { Document } from "mongoose";
import { generateToken, verifyToken } from "../utils/token";
import { AuthResponse } from "../interfaces/AuthResponse";
import { logger } from "../middlewares/log";
import { Request, Response } from "express";

export class AuthService extends Service {

public async register(data: { username: string, password: string }): Promise<resp<DBResp<Document> | undefined>> {
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

        const password_hash = await bcrypt.hash(password, 10);
        const newUser = new usersModel({ username, password_hash });
        await newUser.save();
        logger.info(`User ${username} registered`);
        resp.message = "Registration succeeded";
    } catch (error) {
        resp.code = 500;
        resp.message = "Server error";
        console.error("Error in register:", error);
    }
    return resp;
}

public async login(data: { username: string, password: string }): Promise<resp<AuthResponse | undefined>> {
    const resp: resp<AuthResponse | undefined> = {
        code: 200,
        message: "",
        body: undefined
    };
    try {
        const { username, password } = data;
        const user = await usersModel.findOne({ username }) || await adminsModel.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            resp.code = 400;
            resp.message = "Invalid username or password";
            return resp;
        }

        const role = user instanceof usersModel ? "user" : "admin";
        const token = generateToken(user._id, role);
        resp.body = { token };
        logger.info(`${role === "admin" ? "Admin" : "User"} ${username} logged in`);
        resp.message = "Login succeeded";
    } catch (error) {
        resp.code = 500;
        resp.message = "Server error";
        console.error("Error in login:", error);
    }
    return resp;
}
}