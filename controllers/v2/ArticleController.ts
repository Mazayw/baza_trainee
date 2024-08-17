import { Request, Response } from "express";
import Article from "../../models/v2/Article";
import { getFilePath } from "../../utils/getFilePath";
import { SETTINGS } from "../../settings";
import { mergeObjects } from "../../utils/mergeObject";
import { deleteFile } from "../fileUpload/disk-storage";

export const createArticle = async (req: Request, res: Response) => {
  try {
    const image = SETTINGS.allowCreateDocumentWithoutFile
      ? getFilePath(req) || req.body.image
      : getFilePath(req);

    const article = new Article({
      ...req.body,
      imageUrl: image,
    });
    const result = await article.save();

    res.status(201).json(result);
  } catch (error) {
    console.error("Error, can't create an article", error);
    res.status(500).json({ error: "An error occurred while creating data" });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  const { search, page, limit } = req.query;

  const searchQuery = new RegExp(search as string, "i");

  const currentPage = parseInt(page as string) || 1;
  const itemsPerPage = parseInt(limit as string) || 9;
  const skip = (currentPage - 1) * itemsPerPage;

  try {
    const totalDocuments = await Article.countDocuments({
      $or: [{ title: searchQuery }],
    });

    const data = await Article.find({
      $or: [{ title: searchQuery }],
    })
      .skip(skip)
      .limit(itemsPerPage);

    if (!data.length) {
      return res.status(404).json({ message: "Articles not found" });
    }

    res.status(200).json({
      results: data,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalDocuments / itemsPerPage),
        totalResults: totalDocuments,
      },
    });
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
      return res.status(404).json({ message: "Article not found" });
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
    const id = req.params.id;
    const newDataArticle = req.file?.filename
      ? { ...req.body, imageUrl: req.file?.filename }
      : req.body;
    const oldArticle = await Article.findById(id);

    if (!oldArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    const updatedFields = mergeObjects(oldArticle._doc, newDataArticle);
    const updatedArticle = await Article.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (req.file?.filename && oldArticle?.imageUrl)
      deleteFile(oldArticle.imageUrl);

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
      return res.status(404).json({ message: "Article not found" });
    }
    deleteFile(article.imageUrl);

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error, can't delete an article", error);
    res.status(500).json({
      error: "An error occurred while deleting an article",
    });
  }
};
