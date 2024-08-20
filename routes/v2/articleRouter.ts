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

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ArticleRequest'
 *     responses:
 *       201:
 *         description: An article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleResponse'
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
  articleValidation,
  ArticleController.createArticle
);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
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
 *                 $ref: '#/components/schemas/ArticleResponse'
 *       500:
 *         description: An error occurred while getting data
 */
router.get('/', ArticleController.getArticles);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get an article by ID
 *     tags: [Articles]
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
 *               $ref: '#/components/schemas/ArticleResponse'
 *       404:
 *         description: Article not found
 *       500:
 *         description: An error occurred while getting an article by id
 */
router.get('/:id', ArticleController.getArticleById);


/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete an article by ID
 *     tags: [Articles]
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
router.delete("/:id", checkAuth, ArticleController.deleteArticleById);


/**
 * @swagger
 * /articles/{id}:
 *   patch:
 *     summary: Update an article by ID
 *     tags: [Articles]
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
 *             $ref: '#/components/schemas/ArticleRequest'
 *     responses:
 *       200:
 *         description: Article updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleResponse'
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
  articleValidation,
  ArticleController.updateArticle
);

export default router;
