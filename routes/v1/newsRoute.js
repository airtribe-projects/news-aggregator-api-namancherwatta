import { Router } from "express";
import check_authentication from "../../middleware/checkAuthentication.js";
import { getNews,markFavorite,markRead,getFavoriteArticles,getReadArticles,searchNews } from "../../controller/newsController.js";

const router= Router()

router.get("/",check_authentication,getNews)
router.post("/:id/read", check_authentication, markRead);
router.post("/:id/favorite", check_authentication, markFavorite);
router.get("/read", check_authentication, getReadArticles);
router.get("/favorites", check_authentication, getFavoriteArticles);
router.get("/search/:keyword", check_authentication, searchNews);


export default router