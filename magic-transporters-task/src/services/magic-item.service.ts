import "reflect-metadata";
import { injectable } from "tsyringe";
import { MagicItemModel } from "../schemas/magic-item";

@injectable()
export class MagicItemService {
  async createItem(data: { name: String; weight: number }) {
    return await MagicItemModel.create({
      weight: data.weight,
      name: data.name,
    });
  }
}
