import {Request, Response} from "express";

export abstract class Service{
    abstract handleRequest(req: Request, res: Response): Promise<void>;
} 
