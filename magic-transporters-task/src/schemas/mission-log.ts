import mongoose, { Document, Schema } from "mongoose";
import { IMagicMover } from "./magic-mover";
import { IMagicItem } from "./magic-item";

export interface IMissionLog extends Document {
  magic_mover: IMagicMover["_id"];
  magic_items: IMagicItem["_id"][];
  start_time: Date;
  end_time?: Date;
}

const MissionLogSchema: Schema = new Schema({
  start_time: { type: Date, require: true },
  end_time: { type: Date, require: false },
  magic_mover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "magic-mover",
    require: true,
  },
  magic_items: [{ type: mongoose.Schema.Types.ObjectId, ref: "magic-item" }],
});

export const MissionLogModel = mongoose.model<IMissionLog>(
  "mission-log",
  MissionLogSchema
);
