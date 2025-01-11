"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModel = exports.commentsSchemas = void 0;
const mongoose_1 = require("mongoose");
exports.commentsSchemas = new mongoose_1.Schema({
    text: { type: String, required: true },
    username: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
exports.CommentsModel = (0, mongoose_1.model)("comments", exports.commentsSchemas);
