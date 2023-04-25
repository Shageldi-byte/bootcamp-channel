import authController from "./auth/auth.controller.mjs";
import categoryController from "./category/category.controller.mjs";
import express from "express";
import videoController from "./video/video.controller.mjs";

const v1 = express.Router();

v1.use('/auth',authController);
v1.use('/category',categoryController);
v1.use('/video',videoController);

export default v1;