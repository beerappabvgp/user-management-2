import express from "express";
import { message, createUser } from "../controllers/users.js";
import { User } from "../models/userSchema.js";

const router = express.Router();

// http://localhost:5000/users/
router.get("/", message);

// http:localhost:5000/users/create
router.post("/create", createUser);

// http://localhost:5000/users/allUsers
router.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      msg: "Retrieved all the users successfully ... ",
      users: users,
    });
  } catch (error) {
    console.log(error);
  }
});

// http://localhost:5000/users/67b0a32982a51aeae08e9f49
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    // get the user document with this id
    const user = await User.findById(id);
    res.status(200).json({
      msg: "user retrieved successfully ... ",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
});

// http://localhost:5000/users/67b0a32982a51aeae08e9f49
router.delete("/:id",  async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        res.status(400).json({
            msg: "No user in the DB",
            user: user
        });
    }
    res.status(200).json({
        msg: "user deleted successfully ... ",
        user: user
    });
});


router.put("/:id", async (req, res) => {
    try {
        console.log(req.body);
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({
                "msg": "All fields are required ... "
            });
        }
        if (typeof username !== "string") {
            return res.status(400).json({
                "msg": "username must be a string"
            });
        }
        if (typeof email !== "string") {
            return res.status(400).json({
                "msg": "email must be a string"
            });
        }
        if (typeof password !== "string") {
            return res.status(400).json({
                "msg": "password must be a string"
            });
        }

        const { id } = req.params;

        // I wanted to update data on the db 
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(201).json({
            "msg": "User updated successfully .... ",
            user: user
        });
    } catch (error) {
        console.log(error);
    }
});


export default router;