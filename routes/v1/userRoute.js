import { Router } from "express";
const router= Router()
import { userRegister,userLogin,getPreferences,updatePreferences} from "../../controller/userController.js";
import check_authentication from "../../middleware/checkAuthentication.js";

router.post("/register",userRegister)
router.post("/login",userLogin)
router.get("/preferences",check_authentication,getPreferences)
router.put("/preferences",check_authentication,updatePreferences)


export default router