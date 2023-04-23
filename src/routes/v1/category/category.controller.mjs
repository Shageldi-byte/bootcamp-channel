import express from "express";
import { authenticateToken, checkIsAdmin } from "../auth/jwt.service.mjs";
import { addCategory, deleteCategory, getCategory, updateCategory } from "./category.service.mjs";

const categoryController = express.Router();
categoryController.post('/add-category',authenticateToken,checkIsAdmin,addCategory);
categoryController.put('/update-category/:id',authenticateToken,checkIsAdmin,updateCategory);
categoryController.patch('/delete-category/:id',authenticateToken,checkIsAdmin,deleteCategory);
categoryController.get('/get-category',getCategory);

export default categoryController;