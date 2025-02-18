import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";
export const message = (req, res) => {
  res.send("Hi there!!!");
};

export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        msg: "All fields are required ... ",
      });
    }
    if (typeof username !== "string") {
      return res.status(400).json({
        msg: "username must be a string",
      });
    }
    if (typeof email !== "string") {
      return res.status(400).json({
        msg: "email must be a string",
      });
    }
    if (typeof password !== "string") {
      return res.status(400).json({
        msg: "password must be a string",
      });
    }
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword is:", hashedPassword);

    // I wanted to put data on the db
    console.log({...req.body, password: hashedPassword });
    const user = await User.create({...req.body, password: hashedPassword });
    return res.status(201).json({
      msg: "User created successfully .... ",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                msg: "Both email and password are required"
            });
        }
        console.log("email: ", email);
        // Find one document in the user collection with the email
        const user = await User.findOne({ email: email });
        console.log("user: ", user);
        if (!user) {
            res.status(400).json({
                msg: "The user with the email does not exist on the DB ... "
            });
        }

        const isSame = await bcrypt.compare(password, user.password);
        console.log("isSame: ", isSame);
        // generate a new jwt token for the user and send it to the client 
        const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "120ms"});
        console.log("token is: ", token);
        if (isSame) {
            return res.status(200).json({
                msg: "Signed in successfully ...",
                token: token,
            });
        } else {
            return res.status(400).json({
                msg: "Passwords did not match ... "
            });
        }

    } catch (error) {
        console.log(error);
    }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      msg: "Retrieved all the users successfully ... ",
      users: users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
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
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    res.status(400).json({
      msg: "No user in the DB",
      user: user,
    });
  }
  res.status(200).json({
    msg: "user deleted successfully ... ",
    user: user,
  });
};


export const updateUser = async (req, res) => {
    try {
      console.log(req.body);
      const { username, password, email } = req.body;
      // if (!username || !password || !email) {
      //     return res.status(400).json({
      //         "msg": "All fields are required ... "
      //     });
      // }
      // if (typeof username !== "string") {
      //     return res.status(400).json({
      //         "msg": "username must be a string"
      //     });
      // }
      // if (typeof email !== "string") {
      //     return res.status(400).json({
      //         "msg": "email must be a string"
      //     });
      // }
      // if (typeof password !== "string") {
      //     return res.status(400).json({
      //         "msg": "password must be a string"
      //     });
      // }
  
      const { id } = req.params;
  
      // I wanted to update data on the db
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(201).json({
        msg: "User updated successfully .... ",
        user: user,
      });
    } catch (error) {
      console.log(error);
    }
}

export const patchUser = async (req, res) => {
    try {
      console.log(req.body);
      const { username, password, email } = req.body;
      const { id } = req.params;
  
      // I wanted to update data on the db
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(201).json({
        msg: "User updated successfully .... ",
        user: user,
      });
    } catch (error) {
      console.log(error);
    }
  }
// 200 - ok
// 400 - client side errors
// 500 - server side errors
