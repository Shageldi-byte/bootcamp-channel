import express from "express";
import { authenticateToken } from "../auth/jwt.service.mjs";
import { addComment, checkIsOwnComment, deleteComment, updateComment } from "./comment.service.mjs";

const commentController = express.Router();

commentController.post('/add-comment/:videoId',authenticateToken,addComment);
commentController.put('/update-comment/:cId',authenticateToken,checkIsOwnComment,updateComment);
commentController.patch('/delete-comment/:cId',authenticateToken,checkIsOwnComment,deleteComment);


export default commentController;