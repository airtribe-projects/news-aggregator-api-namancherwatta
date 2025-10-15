import { Router } from "express";
const router= Router()
import { userRegister} from "../../controller/userController.js";


router.post("/register",userRegister)


export default router