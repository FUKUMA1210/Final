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
exports.CommentService = void 0;
const commentsSchemas_1 = require("../orm/schemas/commentsSchemas");
class CommentService {
    addComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newComment = yield commentsSchemas_1.CommentsModel.create(data);
                return { code: 201, message: "Comment added", body: newComment };
            }
            catch (error) {
                return { code: 500, message: "Server error", body: null };
            }
        });
    }
    updateComment(commentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedComment = yield commentsSchemas_1.CommentsModel.findByIdAndUpdate(commentId, { message: data.message }, { new: true });
                if (!updatedComment)
                    return { code: 404, message: "Comment not found", body: null };
                return { code: 200, message: "Comment updated", body: updatedComment };
            }
            catch (error) {
                return { code: 500, message: "Server error", body: null };
            }
        });
    }
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedComment = yield commentsSchemas_1.CommentsModel.findByIdAndDelete(commentId);
                if (!deletedComment)
                    return { code: 404, message: "Comment not found", body: null };
                return { code: 200, message: "Comment deleted", body: null };
            }
            catch (error) {
                return { code: 500, message: "Server error", body: null };
            }
        });
    }
    getCommentsByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield commentsSchemas_1.CommentsModel.find({ username });
                if (comments.length === 0)
                    return { code: 404, message: "No comments found for this user", body: null };
                return { code: 200, message: "Comments retrieved", body: comments };
            }
            catch (error) {
                return { code: 500, message: "Server error", body: null };
            }
        });
    }
}
exports.CommentService = CommentService;
