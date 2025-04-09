import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
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
app.listen(3000, () => {
  console.log("server connected on port 3000!");
});

app.use("/api/user", userRoutes);
