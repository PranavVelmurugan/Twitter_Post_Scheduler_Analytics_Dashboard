
import { Request, Response, NextFunction } from "express";
import { tweetPayloadSChema, scheduleTweetPayloadSchema, updateTweetPayloadSchema } from "../validators/joiSchema.js";

export function validateTweetPayload(req: Request, res: Response, next: NextFunction) {
  const { error } = tweetPayloadSChema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error?.details && error.details[0] ? error.details[0].message : "Invalid payload" });
  }
  next();
}

export function validateScheduleTweetPayload(req: Request, res: Response, next: NextFunction) {
  const { error } = scheduleTweetPayloadSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error?.details && error.details[0] ? error.details[0].message : "Invalid payload" });
  }
  next();
}

export function updateJoiSchema(req: Request, res: Response, next: NextFunction) {
  const { error } = updateTweetPayloadSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error?.details && error.details[0] ? error.details[0].message : "Invalid payload" });
  }
  next();
}