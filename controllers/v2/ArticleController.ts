import { Request, Response } from "express";
import Article from "../../models/Article";

export const createArticle = async (req: Request, res: Response) => {
  try {
    const result = await Article.create({ ...req.body });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error, can't create an article", error);
    res.status(500).json({ error: "An error occurred while creating data" });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    const data = await Article.find();

    if (!data) {
      res.status(404).json({ message: "Articles not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error, can't get articles", error);
    res.status(500).json({
      error: "An error occurred while getting data",
    });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  try {
    const article = await Article.findById({ _id });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Error, can't get the article", error);
    res.status(500).json({
      error: "An error occurred while getting an article by id",
    });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const newDataArticle = req.body;
    const { id: _id } = req.params;

    const updatedArticle = await Article.findByIdAndUpdate(
      { _id },
      newDataArticle,
      { new: true }
    );

    res.json(updatedArticle);
  } catch (error) {
    console.error("Error, can't save changes", error);
    res.status(500).json({
      error: "An error occurred while saving data",
    });
  }
};

export const deleteArticleById = async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  try {
    const article = await Article.findByIdAndDelete({ _id });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Article deleted" });
  } catch (error) {
    console.error("Error, can't delete an article", error);
    res.status(500).json({
      error: "An error occurred while deleting an article",
    });
  }
};
