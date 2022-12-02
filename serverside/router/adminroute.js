import express from 'express';
import {verifyToken} from '../middleware/vtoken'
import {CheckMail} from '../middleware/checkmail'
import {adminSignUp,login,getAdminById,list} from '../controller/admincontroller'
const router = express.Router();

router.post("/adminSignup",CheckMail,adminSignUp)
router.post("/adminlogin",login)
router.get("/getAdminById",verifyToken,getAdminById)
router.get("/list",list)
export default router;