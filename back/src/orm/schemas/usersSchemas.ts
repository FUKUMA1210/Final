import { model, Schema } from "mongoose";
import { User } from "../../interfaces/User";

export const usersSchemas = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

export const usersModel = model<User>('users', usersSchemas);
