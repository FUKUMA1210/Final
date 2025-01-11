"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const Service_1 = require("../abstract/Service");
const usersSchemas_1 = require("../orm/schemas/usersSchemas");
class UserService extends Service_1.Service {
    // 查詢所有用戶
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = {
                code: 200,
                message: "",
                body: undefined
            };
            try {
                const users = yield usersSchemas_1.usersModel.find().select('-password_hash -__v');
                resp.body = users;
                resp.message = "Users retrieved successfully";
            }
            catch (error) {
                resp.code = 500;
                resp.message = "Server error";
                console.error("Error in getAllUsers:", error);
            }
            return resp;
        });
    }
    // 新增用戶
    addUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = {
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
                const existingUser = yield usersSchemas_1.usersModel.findOne({ username });
                if (existingUser) {
                    resp.code = 400;
                    resp.message = "Username already exists";
                    return resp;
                }
                const newUser = new usersSchemas_1.usersModel({ username, password });
                yield newUser.save();
                resp.message = "User added successfully";
            }
            catch (error) {
                resp.code = 500;
                resp.message = "Server error";
                console.error("Error in addUser:", error);
            }
            return resp;
        });
    }
}
exports.UserService = UserService;
