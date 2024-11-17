import express from "express";
import { MagicMoverModel, QuestStateEnum } from "../schemas/magic-mover";
import { MissionLogModel } from "../schemas/mission-log";

const router = express.Router();

/**
 * Start a mission (mover deliver the items)
 * @Body (mover_id)
 */
router.post("/start", async (req: any, res: any) => {
  try {
    const { mover_id } = req.body;
    if (!mover_id) return res.json({ error: "mover id is required" });

    const mover = await MagicMoverModel.findById(mover_id);
    if (!mover) return res.status(404).json({ error: "Magic Mover not found" });

    //check mover state
    if (mover.quest_state !== QuestStateEnum.LOADING) {
      return res
        .status(400)
        .json({ error: "Mover must be in loading state to start a mission" });
    }

    // create mission log with mover and items
    const mission_log = await MissionLogModel.create({
      magic_mover: mover._id,
      magic_items: mover.magic_items,
      start_time: new Date(),
    });

    // update the state to no-mission
    // add the new mission to mover's missions
    mover.quest_state = QuestStateEnum.ON_MISSION;
    mover.mission_logs = [...mover.mission_logs, { _id: mission_log._id }];
    await mover.save();

    res.status(200).json({ mover, mission_log });
  } catch (err) {
    res.status(500).json({ error: "Failed to start mission" });
  }
});

/**
 * End a mission
 * @Body (mover_id)
 */
router.post("/end", async (req: any, res: any) => {
  try {
    const { mover_id } = req.body;
    if (!mover_id) return res.json({ error: "mover id is required" });

    const mover = await MagicMoverModel.findById(mover_id);
    if (!mover) return res.status(404).json({ error: "Magic Mover not found" });

    // check mover state
    if (mover.quest_state !== QuestStateEnum.ON_MISSION)
      return res
        .status(400)
        .json({ error: "Mover must be on a mission to end it" });

    // get the mission that not finished
    // update the mission's end_time filed (mission finished)
    const missionLog = await MissionLogModel.findOneAndUpdate(
      { magic_mover: mover._id, end_time: { $exists: false } },
      { $set: { end_time: new Date() } },
      { new: true }
    );

    // update mover state to resting
    // empty the magic_items
    // increase missions_completed
    mover.quest_state = QuestStateEnum.RESTING;
    mover.magic_items = [];
    mover.missions_completed += 1;

    await mover.save();

    res.status(200).json({ mover, missionLog });
  } catch (err) {
    res.status(500).json({ error: "Failed to end mission" });
  }
});

export default router;
