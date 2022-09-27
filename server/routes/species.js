import db from "../db/db-connection.js";
import Router from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const species = await db.any("SELECT * FROM species ORDER BY id", [true]);
    res.send(species);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

export default router;
