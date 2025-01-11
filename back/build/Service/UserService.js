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
const usersSchemas_1 = require("../orm/schemas/usersSchemas");
class UserService {
    /**
     * 取得所有使用者
     * @returns 使用者清單
     */
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield usersSchemas_1.usersModel.find();
                return users.map(user => (Object.assign(Object.assign({}, user.toObject()), { _id: user._id.toString() })));
            }
            catch (error) {
                console.error("Error fetching users:", error);
                throw new Error("Database error");
            }
        });
    }
    /**
     * 根據 ID 取得使用者資訊
     * @param id 使用者 ID
     * @returns 單一使用者資訊
     */
    getUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield usersSchemas_1.usersModel.findById(id);
                if (!user)
                    return null;
                return Object.assign(Object.assign({}, user.toObject()), { _id: user._id.toString() });
            }
            catch (error) {
                console.error("Error fetching user by ID:", error);
                return null;
            }
        });
    }
    /**
     * 新增使用者
     * @param username 使用者名稱
     * @param password 密碼
     * @returns 新增結果
     */
    addUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield usersSchemas_1.usersModel.findOne({ username });
                if (existingUser)
                    throw new Error("Username already exists");
                const newUser = new usersSchemas_1.usersModel({ username, password });
                const savedUser = yield newUser.save();
                return Object.assign(Object.assign({}, savedUser.toObject()), { _id: savedUser._id.toString() });
            }
            catch (error) {
                console.error("Error adding user:", error);
                throw new Error("Failed to add user");
            }
        });
    }
    /**
     * 實作抽象方法 handleRequest
     * @param req
     * @returns
     */
    handleRequest(req) {
        console.log("Handle request:", req);
        return { message: "Handled request" };
    }
}
exports.UserService = UserService;
