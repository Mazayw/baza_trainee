import { Router } from "express";
import * as ArticleController from "../../controllers/v2/ArticleController";
import { uploadWithFileSizeValidation } from "../../controllers/fileUpload";
import checkAuth from "../../utils/checkAuth";
import { articleValidation } from "../../utils/validations/v2/articleValidation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API endpoints for managing articles
 */


router.post(
  "/",
  checkAuth,
  uploadWithFileSizeValidation("single"),
  articleValidation,
  ArticleController.createArticle
);

router.get('/', ArticleController.getArticles);

router.get('/:id', ArticleController.getArticleById);

router.delete("/:id", checkAuth, ArticleController.deleteArticleById);

router.patch(
  "/:id",
  checkAuth,
  uploadWithFileSizeValidation("single"),
  articleValidation,
  ArticleController.updateArticle
);

export default router;
