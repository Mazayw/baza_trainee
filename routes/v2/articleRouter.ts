import { Router } from "express";
import * as ArticleController from "../../controllers/v2/ArticleController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API endpoints for managing articles
 */


router.post(
  "/",
  ArticleController.createArticle
);

router.get('/', ArticleController.getArticles);

router.get('/:id', ArticleController.getArticleById);

router.delete('/:id', ArticleController.deleteArticleById);

router.patch('/:id', ArticleController.updateArticle)

export default router;
