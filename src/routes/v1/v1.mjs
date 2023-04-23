import authController from "./auth/auth.controller.mjs";
import categoryController from "./category/category.controller.mjs";
import express from "express";

const v1 = express.Router();

v1.use('/auth',authController);
v1.use('/category',categoryController);

export default v1;