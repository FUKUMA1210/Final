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
exports.AuthService = void 0;
const usersSchemas_1 = require("../orm/schemas/usersSchemas");
const log_1 = require("../middlewares/log");
class AuthService {
    /**
     * 用戶登入
     * @param data 包含 username 和 password 的對象
     */
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
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
                const user = yield usersSchemas_1.usersModel.findOne({ username });
                if (!user || user.password !== password) {
                    response.code = 400;
                    response.message = "Invalid username or password";
                    return response;
                }
                response.message = "Login succeeded";
            }
            catch (error) {
                response.code = 500;
                response.message = "Server error";
                console.error("Error in login:", error);
            }
            return response;
        });
    }
    /**
     * 用戶登出
     * @param Request Express 的請求對象
     */
    logout(Request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                code: 200,
                message: "",
                body: "",
            };
            try {
                response.message = "Logout succeeded";
                log_1.logger.info(`User logged out successfully`);
            }
            catch (error) {
                response.code = 500;
                response.message = "Server error";
                console.error("Error in logout:", error);
            }
            return response;
        });
    }
}
exports.AuthService = AuthService;
