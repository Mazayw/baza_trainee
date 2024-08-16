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
