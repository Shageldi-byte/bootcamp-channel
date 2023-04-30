import express from "express";
import { authenticateToken, checkIsAdmin } from "../auth/jwt.service.mjs";
import { addTags, deleteTag, updateTag } from "./tag.service.mjs";

const tagController = express.Router();
tagController.post('/add-tag/:videoId',authenticateToken,checkIsAdmin,addTags);
tagController.put('/update-tag/:tagId',authenticateToken,checkIsAdmin,updateTag);
tagController.patch('/delete-tag/:tagId',authenticateToken,checkIsAdmin,deleteTag);

export default tagController;