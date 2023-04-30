import express from "express";
import { authenticateToken } from "../auth/jwt.service.mjs";
import { addLike, removeLike } from "./like.service.mjs";

const likeController = express.Router();
likeController.post('/add-like/:videoId',authenticateToken,addLike);
likeController.patch('/remove-like/:videoId',authenticateToken,removeLike);

export default likeController;