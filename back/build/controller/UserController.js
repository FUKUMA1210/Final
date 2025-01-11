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
exports.UserController = void 0;
const Controller_1 = require("../abstract/Controller");
const UserService_1 = require("../Service/UserService");
require('dotenv').config();
class UserController extends Controller_1.Controller {
    constructor() {
        super();
        this.service = new UserService_1.UserService();
    }
    addUser(Request, Response) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.service.addUser(Request.body);
            Response.status(resp.code).send(resp);
        });
    }
    getAllUsers(Request, Response) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.service.getAllUsers();
            Response.status(resp.code).send(resp);
        });
    }
}
exports.UserController = UserController;
