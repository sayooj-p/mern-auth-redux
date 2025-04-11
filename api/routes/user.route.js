import express from "express";
import { deleteUser, test } from "../Controllers/user.controller.js";
import { verifyToken } from "../utils/userVerify.js";
import { updateUser} from "../Controllers/user.controller.js";

const router = express.Router();
router.get("/", test);
router.put('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);

export default router;
