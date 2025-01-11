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
exports.AuthController = void 0;
const Controller_1 = require("../abstract/Controller");
const AuthService_1 = require("../Service/AuthService");
require("dotenv").config();
class AuthController extends Controller_1.Controller {
    constructor() {
        super();
        this.service = new AuthService_1.AuthService();
    }
    register(Request, Response) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.service.register(Request.body);
            Response.status(resp.code).send(resp);
        });
    }
    login(Request, Response) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.service.login(Request.body);
            Response.status(resp.code).send(resp);
        });
    }
}
exports.AuthController = AuthController;
