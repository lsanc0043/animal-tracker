import db from "../db/db-connection.js";
import Router from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const sightings = await db.any("SELECT * FROM sightings ORDER BY id", [true]);
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

export default router;
