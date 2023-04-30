import authController from "./auth/auth.controller.mjs";
import categoryController from "./category/category.controller.mjs";
import clientController from "./client/client.controller.mjs";
import commentController from "./comment/comment.controller.mjs";
import express from "express";
import likeController from "./like/like.controller.mjs";
import tagController from "./tag/tag.controller.mjs";
import videoController from "./video/video.controller.mjs";

const v1 = express.Router();

v1.use('/auth',authController);
v1.use('/category',categoryController);
v1.use('/video',videoController);
v1.use('/tag',tagController);
v1.use('/comment',commentController);
v1.use('/like',likeController);
v1.use('/client',clientController);

export default v1;