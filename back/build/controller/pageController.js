"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const Controller_1 = require("../abstract/Controller");
const PageService_1 = require("../Service/PageService");
require('dotenv').config();
class PageController extends Controller_1.Controller {
    constructor() {
        super();
        this.service = new PageService_1.PageService();
    }
    sendPage(Request, Response) {
        Response.sendFile(process.env.HomePagePath);
    }
}
exports.PageController = PageController;
