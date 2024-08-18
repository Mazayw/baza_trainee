import { Schema, model } from "mongoose";
import { IArticle } from "../../types";

/**
 * @swagger
 * components:
 *   schemas:
 *     ArticleResponse:
 *       type: object
 *       required:
 *          - title
 *          - description
 *          - link
 *          - imageUrl
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
 *       example:
 *         title: example
 *         description: Long text
 *         link: https://example.com
 *         date: 1669872000000
 *         imageUrl: image.jpg
 *     ArticleRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - link  
 *         - imageUrl
 *       properties:
 *         title:
 *           type: string
 *           description: Title.
 *         description:
 *           type: string
 *           description: Long text.
 *         date: 
 *           type: number
 *           description: 26589547600
 *         link:
 *            type: string
 *            description: The URL of the partner's article.
 *         file:
 *           type: file
 *           format: binary
 *           description: image file (JPG, PNG, WEBP)
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
