import express from "express";
import { getProfile, hashPassword, login, signUp, updateUserImage, uploadUserImage, verifyEmail } from "./auth.service.mjs";
import { authenticateToken } from "./jwt.service.mjs";

const authController = express.Router();

authController.post('/sign-up',hashPassword,signUp);
authController.get('/verify-email/:key',verifyEmail);
authController.post('/sign-in',login);
authController.post('/update-user-image',authenticateToken,uploadUserImage.single('image'),updateUserImage);
authController.get('/get-profile',authenticateToken,getProfile);

export default authController;