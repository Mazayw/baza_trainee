import { Schema, model } from "mongoose";
import { IArticle } from "../../types";

/**
 * @swagger
 * components:
 *   schemas:
 *     Articles:
 *       type: object
 *       required:
 *          - title
 *          - description
 *          - link
 *       properties:
 *         imageUrl:
 *           type: string
 *           description: The image of the partner's article.
 *         title:
 *           type: string
 *           description: An article title
 *         description:
 *            type: string
 *            description: A short part article
 *         link:
 *            type: string
 *            description: The URL of the partner's article.
 *         date:
 *           type: number
 *           description: Date
 */

const ArticleSchema = new Schema<IArticle>({
  imageUrl: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Number },
});
const Article = model("Article", ArticleSchema);

export default Article;
