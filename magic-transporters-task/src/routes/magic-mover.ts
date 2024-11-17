import express from "express";
import { MagicMoverModel, QuestStateEnum } from "../schemas/magic-mover";
import Joi from "joi";
import { MagicItemModel } from "../schemas/magic-item";

const moversRouter = express.Router();

/**
 * create magic mover
 * @Body (weight_limit)
 */
const magicMoverSchema = Joi.object({
  weight_limit: Joi.number().positive().required(),
});
moversRouter.post("/", async (req: any, res: any) => {
  const { error } = magicMoverSchema.validate(req.body);
  if (error) return res.json({ error: error.details[0].message });

  try {
    const { weight_limit } = req.body;
    const mover = await MagicMoverModel.create({
      weight_limit,
    });
    res.status(201).json({ mover });
  } catch (error) {
    res.status(500).json({ error: "Failed to create Magic Mover" });
  }
});

/**
 * load items into mover
 * @Body (item_id)
 * @Param (id) => mover id
 */
const loadItemsIntoMoverSchema = Joi.object({
  item_id: Joi.string().required(),
});
moversRouter.post("/:id", async (req: any, res: any) => {
  const { error } = loadItemsIntoMoverSchema.validate(req.body);
  if (error) return res.json({ error: error.details[0].message });

  try {
    const { item_id } = req.body;
    const { id } = req.params;

    const item = await MagicItemModel.findById(item_id);
    if (!item) return res.json({ error: "item not found." });

    const mover = await MagicMoverModel.findById(id);
    if (!mover) return res.json({ error: "mover not found." });

    // check the mover state
    if (mover.quest_state == QuestStateEnum.ON_MISSION)
      return res.json({ error: "the mover on mission wait until finish." });

    // check the weight
    if (item.weight > mover.weight_limit)
      return res.json({ error: "Items exceed mover’s weight limit." });

    // load the item into mover
    //update the state to loading
    mover.magic_items = [...mover.magic_items, { _id: item._id }];
    mover.quest_state = QuestStateEnum.LOADING;
    await mover.save();

    res.json({ message: "item loaded successfuly." });
  } catch (error) {
    res.status(500).json({ error: "Failed to create Magic Mover" });
  }
});

/**
 * List Movers by Missions Completed
 * @returns the top 5 Magic Movers who completed the most Missions
 */
moversRouter.get("/", async (req, res) => {
  try {
    // -1 means descending
    //  1 means ascending
    const magic_movers = await MagicMoverModel.find()
      .sort({ missions_completed: -1 })
      .limit(5);

    res.status(200).json({ magic_movers });
  } catch (err) {
    res.status(500).json({ error: "Failed to List Magic Movers" });
  }
});

export default moversRouter;
