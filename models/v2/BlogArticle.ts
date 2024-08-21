import { Schema, model } from "mongoose";
import { IBlogArticle } from "../../types";

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogArticleResponse:
 *       type: object
 *       required:
 *         - imageUrl
 *         - title
 *         - text
 *       properties:
 *         text:
 *           type: string
 *           description: Long text.
 *         title:
 *           type: string
 *           description: An article's title.
 *         imageUrl:
 *           type: string
 *           description: The URL of the partner's image.
 *         date: 
 *           type: number
 *           description: Date
 *       example:
 *         title: example
 *         text: Long text
 *         date: 888888444440 
 *         imageUrl: image.jpg
 *     BlogArticleRequest:
 *       type: object
 *       required:
 *         - title
 *         - text  
 *         - imageUrl
 *       properties:
 *         title:
 *           type: string
 *           description: Title.
 *         text:
 *           type: string
 *           description: Long text.
 *         date: 
 *           type: number
 *           description: 26589547600
 *         file:
 *           type: file
 *           format: binary
 *           description: image file (JPG, PNG, WEBP)
 */
const BlogArticleSchema = new Schema<IBlogArticle>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: {type: Number},
  imageUrl: { type: String, required: true },
});

const BlogArticle = model("blogArticle", BlogArticleSchema);

export default BlogArticle;
