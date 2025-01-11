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
exports.CommentController = void 0;
const Controller_1 = require("../abstract/Controller");
const CommentService_1 = require("../Service/CommentService");
require('dotenv').config();
class CommentController extends Controller_1.Controller {
    constructor() {
        super();
        this.service = new CommentService_1.CommentService();
    }
    addComment(Request, Response) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.service.addComment(Request.body);
            Response.status(resp.code).send(resp);
        });
    }
    updateComment(Request, Response) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.service.updateComment(Request.params.commentId, Request.body);
            Response.status(resp.code).send(resp);
        });
    }
    deleteComment(Request, Response) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.service.deleteComment(Request.params.commentId);
            Response.status(resp.code).send(resp);
        });
    }
    getCommentsByUsername(Request, Response) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.service.getCommentsByUsername(Request.params.username);
            Response.status(resp.code).send(resp);
        });
    }
}
exports.CommentController = CommentController;
