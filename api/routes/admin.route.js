import express from 'express';
import { getAllUsers,getEditDetails,test} from '../Controllers/admin.controller.js';
import { verifyToken } from '../utils/userVerify.js';
import { deleteUser} from '../Controllers/admin.controller.js'
// import { getEditDetails} from "../Controllers/admin.controller.js";
import { updateUserByAdmin } from '../Controllers/admin.controller.js';
const router = express.Router();
router.get("/admin", test);
router.get('/users', verifyToken, getAllUsers);
router.get('/user/:id', verifyToken, getEditDetails);
router.delete('/delete/:id', verifyToken, deleteUser);
router.put('/update/:id', verifyToken, updateUserByAdmin);


export default router;