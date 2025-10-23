import { Router } from "express";
import check_authentication from "../../middleware/checkAuthentication.js";
import { getNews } from "../../controller/newsController.js";

const router= Router()

router.get("/",check_authentication,getNews)

export default router