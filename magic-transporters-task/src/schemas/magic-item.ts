import mongoose, { Document, Schema } from "mongoose";

export interface IMagicItem extends Document {
  name: string;
  weight: number;
}

const MagicItemSchema: Schema = new Schema({
  name: { type: String, require: true },
  weight: { type: Number, require: true },
});

export const MagicItemModel = mongoose.model<IMagicItem>(
  "magic-item",
  MagicItemSchema
);
