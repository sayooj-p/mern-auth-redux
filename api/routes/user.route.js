import express from "express";
import { test } from "../Controllers/user.controller.js";
import { verifyToken } from "../utils/userVerify.js";
import { updateUser } from "../Controllers/user.controller.js";

const router = express.Router();
router.get("/", test);
router.post('/update/:id',verifyToken,updateUser);

export default router;
