import "reflect-metadata";
import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { MagicItemService } from "../services/magic-item.service";

@autoInjectable()
export class MagicItemController {
  constructor(private magicMoverService?: MagicItemService) {}

  async createMagicItem(req: Request, res: Response) {
    try {
      const { name, weight } = req.body;
      const item = await this.magicMoverService?.createItem({ name, weight });
      res.status(201).json({ item });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
