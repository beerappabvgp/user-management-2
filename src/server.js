import express from "express";
import mongoose from "mongoose";

// creating a new express application 
import userRoutes from "./routes/userRoutes.js";
const app = express();
const port = 5000;
app.use(express.json());
app.use("/users", userRoutes);
const mongo_url = "mongodb+srv://beerappabharathb:1XFok1E9wKPEYicb@cluster0.9embs.mongodb.net/user-management?retryWrites=true&w=majority&appName=Cluster0";

// get, post, put, delete 

// connecting to the database 
const connectToDB = async () => {
    await mongoose.connect(mongo_url);
    console.log("connected to the database ... ");
}

connectToDB();

app.listen(5000);