import { Contorller } from "../abstract/Contorller";
import { Request, Response } from "express";
import { AuthService } from "../Service/AuthService";
require("dotenv").config();

export class AuthController extends Contorller {
    protected service: AuthService;

    constructor() {
        super();
        this.service = new AuthService();
    }

    public async register(Request: Request, Response: Response) {
        try {
            const resp = await this.service.register(Request.body); 
            Response.status(resp.code).send(resp); 
        } catch (error) {
            console.error("Error in register controller:", error);
            Response.status(500).send({ message: "Server error" });
        }
    }


    public async login(Request: Request, Response: Response) {
        try {
            const resp = await this.service.login(Request.body); 
            Response.status(resp.code).send(resp); 
        } catch (error) {
            console.error("Error in login controller:", error);
            Response.status(500).send({ message: "Server error" });
        }
    }
}
