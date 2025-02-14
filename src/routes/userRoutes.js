import express from "express";
import { message, createUser } from "../controllers/users.js";

const router = express.Router();

// http://localhost:5000/users/
router.get("/", message);

// http:localhost:5000/users/create
router.post("/create", createUser)

export default router;