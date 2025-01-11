"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoute = void 0;
const CommentController_1 = require("../controller/CommentController");
const Route_1 = require("../abstract/Route");
class CommentRoute extends Route_1.Route {
    constructor() {
        super();
        this.Controller = new CommentController_1.CommentController();
        this.url = '/api/v1/comment/';
        this.setRoutes();
    }
    setRoutes() {
        this.router.post(`${this.url}add`, (req, res) => {
            this.Controller.addComment(req, res);
        });
        this.router.put(`${this.url}update/:commentId`, (req, res) => {
            this.Controller.updateComment(req, res);
        });
        this.router.delete(`${this.url}delete/:commentId`, (req, res) => {
            this.Controller.deleteComment(req, res);
        });
        this.router.get(`${this.url}user/:username`, (req, res) => {
            this.Controller.getCommentsByUsername(req, res);
        });
    }
}
exports.CommentRoute = CommentRoute;
