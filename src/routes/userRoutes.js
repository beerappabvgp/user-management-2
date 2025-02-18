import express from "express";
import bcrypt from "bcryptjs";
import {
  message,
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  patchUser,
  login
} from "../controllers/users.js";
import { User } from "../models/userSchema.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.get("/dashboard", userMiddleware , (req, res) => {
  return res.status(200).json({
    msg: "Welcome to the dashboard page ... ",
    id: req.user,
  });
});

// http://localhost:5000/users/
router.get("/", message);

// http:localhost:5000/users/create
router.post("/create", createUser);

router.post("/login", login);

// http://localhost:5000/users/allUsers
router.get("/allUsers", getAllUsers);

// http://localhost:5000/users/67b0a32982a51aeae08e9f49
router.get("/:id", getUser);

// http://localhost:5000/users/67b0a32982a51aeae08e9f49
router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

router.patch("/:id", patchUser);  

export default router;
