import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("server connected on port 3000!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
   const statusCode =  err.statusCode || 500;
   const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      sucess: false,
      statusCode,
      message,
    });
})
