import { Router } from "express";
import * as BlogArticleController from "../../controllers/v2/BlogArticleController";
import { uploadWithFileSizeValidation } from "../../controllers/fileUpload";
import checkAuth from "../../utils/checkAuth";
import { blogArticleValidation } from "../../utils/validations/v2/blogArticleValidation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: API endpoints for managing articles in blog
 */

router.post(
  "/",
  checkAuth,
  uploadWithFileSizeValidation("single"),
  blogArticleValidation,
  BlogArticleController.createArticle
);

router.get("/", BlogArticleController.getArticles);

router.get("/:id", BlogArticleController.getArticleById);

router.delete("/:id", checkAuth, BlogArticleController.deleteArticleById);

router.patch(
  "/:id",
  checkAuth,
  uploadWithFileSizeValidation("single"),
  blogArticleValidation,
  BlogArticleController.updateArticle
);

export default router;
