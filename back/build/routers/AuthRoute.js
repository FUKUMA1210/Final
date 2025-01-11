"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const Route_1 = require("../abstract/Route");
const AuthController_1 = require("../controller/AuthController");
class AuthRoute extends Route_1.Route {
    constructor() {
        super();
        this.Controller = new AuthController_1.AuthController();
        this.url = '/api/v1/auth/';
        this.setRoutes();
    }
    setRoutes() {
        this.router.post(`${this.url}login`, (req, res) => {
            this.Controller.login(req, res);
        });
        this.router.post(`${this.url}logout`, (req, res) => {
            this.Controller.logout(req, res);
        });
    }
}
exports.AuthRoute = AuthRoute;
