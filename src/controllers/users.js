import { User } from "../models/userSchema.js";

export const message = (req, res) => {
    res.send("Hi there!!!");
}

export const createUser = async (req, res) => {
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


        // I wanted to put data on the db 
        const user = await User.create(req.body);
        return res.status(201).json({
            "msg": "User created successfully .... ",
            user: user
        });
    } catch (error) {
        console.log(error);
    }
}


// 200 - ok
// 400 - client side errors
// 500 - server side errors