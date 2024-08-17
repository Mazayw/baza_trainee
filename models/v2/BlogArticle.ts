/**
 * @swagger
 * components:
 *   schemas:
 *     BlogArticle:
 *       type: object
 *       required:
 *          - title
 *          - text
 *          - imageUrl
 *       properties:
 *         imageUrl:
 *           type: string
 *           description: Image.
 *         title:
 *           type: string
 *           description: An article title
 *         text:
 *            type: string
 *            description: A text article
 *         date:
 *           type: number
 *           description: Date
 *       example:
 *         title: example
 *         text: Long text
 *         date: 1669872000000
 *         imageUrl: image.jpg
 */


import { Schema, model } from "mongoose";
import { IBlogArticle } from "../../types";

const BlogArticleSchema = new Schema<IBlogArticle>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: Number,
  imageUrl: { type: String, required: true },
});

const BlogArticle = model("blogArticle", BlogArticleSchema);

export default BlogArticle;
