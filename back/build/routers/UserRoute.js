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
        this.router.get(`${this.url}getUserData`, (req, res) => {
            this.Controller.getUserData(req, res);
        });
        this.router.put(`${this.url}updateUserByID`, (req, res) => {
            this.Controller.updateUserByID(req, res);
        });
        this.router.post(`${this.url}addReservation`, (req, res) => {
            this.Controller.addReservation(req, res);
        });
        this.router.delete(`${this.url}cancelReservationByID`, (req, res) => {
            this.Controller.cancelReservationByID(req, res);
        });
        this.router.get(`${this.url}getAllReservations`, (req, res) => {
            this.Controller.getAllReservations(req, res);
        });
        this.router.get(`${this.url}getReservationByID`, (req, res) => {
            this.Controller.getReservationByID(req, res);
        });
    }
}
exports.UserRoute = UserRoute;
