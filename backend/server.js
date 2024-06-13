// server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddileware.js"; 
import cors from 'cors';


import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("backend/public"));
app.use(cors());

app.use(cookieParser())

const port = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/admin",adminRoutes);


app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => res.send("Server is Ready"));

app.listen(port, () => console.log(`Server Started on Port ${port}`));
