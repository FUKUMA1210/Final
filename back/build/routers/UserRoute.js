"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const Route_1 = require("../abstract/Route");
const UserController_1 = require("../controller/UserController");
class UserRoute extends Route_1.Route {
    constructor() {
        super();
        this.Controller = new UserController_1.UserController();
        this.url = '/api/v1/user/';
        this.setRoutes();
    }
    setRoutes() {
        this.router.get(`${this.url}getAllUsers`, (req, res) => {
            this.Controller.getAllUsers(req, res);
        });
        this.router.post(`${this.url}addUser`, (req, res) => {
            this.Controller.addUser(req, res);
        });
    }
}
exports.UserRoute = UserRoute;
