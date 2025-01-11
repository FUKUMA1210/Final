"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersModel = exports.usersSchemas = void 0;
const mongoose_1 = require("mongoose");
exports.usersSchemas = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});
exports.usersModel = (0, mongoose_1.model)('users', exports.usersSchemas);
