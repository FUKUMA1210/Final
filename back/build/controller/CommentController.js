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
    addComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.body.username || "anonymous";
                const text = req.body.text;
                if (!username || !text) {
                    return res.status(400).send({ code: 400, message: "Username and text are required", body: null });
                }
                const resp = yield this.service.addComment(username, text);
                res.status(resp.code).send(resp);
            }
            catch (error) {
                res.status(500).send({ code: 500, message: "Server error", body: null });
            }
        });
    }
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentId } = req.params;
                const { text } = req.body;
                if (!text) {
                    return res.status(400).send({ code: 400, message: "Text is required", body: null });
                }
                const resp = yield this.service.updateComment(commentId, text);
                res.status(resp.code).send(resp);
            }
            catch (error) {
                res.status(500).send({ code: 500, message: "Server error", body: null });
            }
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentId } = req.params;
                const resp = yield this.service.deleteComment(commentId);
                res.status(resp.code).send(resp);
            }
            catch (error) {
                res.status(500).send({ code: 500, message: "Server error", body: null });
            }
        });
    }
    getCommentsByUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const resp = yield this.service.getCommentsByUsername(username);
                res.status(resp.code).send(resp);
            }
            catch (error) {
                res.status(500).send({ code: 500, message: "Server error", body: null });
            }
        });
    }
}
exports.CommentController = CommentController;
