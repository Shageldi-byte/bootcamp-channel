import express from "express";
import { search } from "./client.service.mjs";

const clientController = express.Router();

clientController.get('/find',search);

export default clientController;