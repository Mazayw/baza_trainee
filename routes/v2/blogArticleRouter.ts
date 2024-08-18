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

/**
 * @swagger
 * /blog:
 *   post:
 *     summary: Create a new article
 *     tags: [Blog]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/BlogArticleRequest'
 *     responses:
 *       201:
 *         description: An article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogArticleResponse'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

router.post(
  "/",
  checkAuth,
  uploadWithFileSizeValidation("single"),
  blogArticleValidation,
  BlogArticleController.createArticle
);

/**
 * @swagger
 * /blog:
 *   get:
 *     summary: Get all articles
 *     tags: [Blog]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number, default 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of results per page, default 9
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlogArticleResponse'
 *       500:
 *         description: An error occurred while getting data
 */

router.get("/", BlogArticleController.getArticles);

/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     summary: Get an article by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the article
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogArticleResponse'
 *       404:
 *         description: Article not found
 *       500:
 *         description: An error occurred while getting an article by id
 */

router.get("/:id", BlogArticleController.getArticleById);

/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Delete an article by ID
 *     tags: [Blog]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the article
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       401:
 *         description: Unauthorized 
 *       404:
 *         description: Article not found
 *       500:
 *         description: Can't delete an article
 */

router.delete("/:id", checkAuth, BlogArticleController.deleteArticleById);

/**
 * @swagger
 * /blog/{id}:
 *   patch:
 *     summary: Update an article by ID
 *     tags: [Blog]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the article
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/BlogArticleRequest'
 *     responses:
 *       200:
 *         description: Article updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogArticleResponse'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 *       500:
 *         description: An error occurred while saving data
 */

router.patch(
  "/:id",
  checkAuth,
  uploadWithFileSizeValidation("single"),
  blogArticleValidation,
  BlogArticleController.updateArticle
);

export default router;
