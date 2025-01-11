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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usersSchemas_1 = require("../orm/schemas/usersSchemas");
class AuthService {
    /**
     * 用戶註冊
     * @param data 包含 username 和 password 的對象
     */
    register(data) {
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
                const existingUser = yield usersSchemas_1.usersModel.findOne({ username });
                if (existingUser) {
                    response.code = 400;
                    response.message = "Username already exists";
                    return response;
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = new usersSchemas_1.usersModel({ username, password: hashedPassword });
                yield newUser.save();
                response.message = "User registered successfully";
            }
            catch (error) {
                response.code = 500;
                response.message = "Server error";
            }
            return response;
        });
    }
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
                if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                    response.code = 400;
                    response.message = "Invalid username or password";
                    return response;
                }
                response.message = "Login succeeded";
            }
            catch (error) {
                response.code = 500;
                response.message = "Server error";
            }
            return response;
        });
    }
    logout(Request) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = {
                code: 200,
                message: "",
                body: undefined
            };
            try {
                const authHeader = Request.headers.authorization;
                if (!authHeader) {
                    resp.code = 400;
                    resp.message = "Token is required";
                    return resp;
                }
                const token = authHeader.split(' ')[1];
                const decoded = verifyToken(token);
                if (!decoded) {
                    resp.code = 400;
                    resp.message = "Invalid token";
                    return resp;
                }
                const { _id, role } = decoded;
                let username = '';
                if (role === 'user') {
                    const user = yield usersSchemas_1.usersModel.findById(_id);
                    if (user) {
                        username = user.username;
                    }
                }
                else if (role === 'admin') {
                    const admin = yield adminsModel.findById(_id);
                    if (admin) {
                        username = admin.username;
                    }
                }
                logger.info(`User ${username} logged out`);
                resp.message = "Logout succeed";
            }
            catch (error) {
                resp.code = 500;
                resp.message = "Server error";
                console.error("Error in logout:", error);
            }
            return resp;
        });
    }
}
exports.AuthService = AuthService;
