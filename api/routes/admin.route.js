import express from 'express';
import { getAllUsers,test} from '../Controllers/admin.controller.js';
import { verifyToken } from '../utils/userVerify.js';

const router = express.Router();
router.get("/admin", test);
router.get('/users', verifyToken, getAllUsers);

export default router;