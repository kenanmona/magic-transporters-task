import "reflect-metadata";
import express from "express";
import Joi from "joi";
import { container } from "tsyringe";
import { MagicItemController } from "../controllers/magic-item.controller";

const itemsRouter = express.Router();
const controller: MagicItemController = container.resolve(MagicItemController);

const magicItemSchema = Joi.object({
  name: Joi.string().required(),
  weight: Joi.number().positive().required(),
});

/**
 * create magic item
 * @Body (name, weight)
 */
itemsRouter.post("/", async (req: any, res: any) => {
  const { error } = magicItemSchema.validate(req.body);
  if (error) return res.json({ error: error.details[0].message });

  try {
    return await controller.createMagicItem(req, res);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Magic Item" });
  }
});

export default itemsRouter;
