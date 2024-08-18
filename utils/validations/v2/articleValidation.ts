import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { checkValidationError } from "../checkValidationError";
import { fileValidation } from "../fileValidation";
import { SETTINGS } from "../../../settings";
import { deleteFile } from "../../../controllers/fileUpload/disk-storage";

export const articleValidation = [
  body(
    "title",
    `The title is incorrect, it must contain more than 2 characters`
  )
    .optional()
    .isString()
    .isLength({ min: 2 }),
  body(
    "description",
    "Wrong description, it must contain more than 5 characters"
  )
    .optional()
    .isString()
    .isLength({ min: 5 }),
  body("date", "Wrong date, must be a number").optional().isNumeric(),
  body("link", "Wrong link").optional(),
  body("imageUrl", "Wrong image url").optional().isString().isURL(),
  body()
    .optional()
    .custom((_, { req }) => {
      if (req.file)
        return fileValidation(
          req.file,
          SETTINGS.fileSizeLimits.articleImage,
          "image"
        );
      return true;
    }),
  (req: Request, res: Response, next: () => void) => {
    const errors = validationResult(req);
    if (!errors.isEmpty() && req.file) {
      deleteFile(req.file.filename);
    }
    checkValidationError(req, res, next);
  },
];