import mongoose, { Document, Schema } from "mongoose";
import { IMagicItem } from "./magic-item";
import { IMissionLog } from "./mission-log";

export enum QuestStateEnum {
  RESTING = "resting",
  LOADING = "loading",
  ON_MISSION = "on-mission",
}

export interface IMagicMover extends Document {
  weight_limit: number;
  quest_state: QuestStateEnum;
  missions_completed: number;
  magic_items: IMagicItem["_id"][];
  mission_logs: IMissionLog["_id"][];
}

const MagicMoverSchema: Schema = new Schema({
  weight_limit: { type: Number, require: true },
  quest_state: {
    type: String,
    enum: QuestStateEnum,
    default: QuestStateEnum.RESTING,
  },
  missions_completed: { type: Number, default: 0 },

  magic_items: [{ type: mongoose.Schema.Types.ObjectId, ref: "magic-item" }],
  mission_logs: [{ type: mongoose.Schema.Types.ObjectId, ref: "mission-log" }],
});

export const MagicMoverModel = mongoose.model<IMagicMover>(
  "magic-mover",
  MagicMoverSchema
);
