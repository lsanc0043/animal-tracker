import db from "../db/db-connection.js";
import Router from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const individuals = await db.any("SELECT * FROM individuals ORDER BY id", [
      true,
    ]);
    res.send(individuals);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

export default router;
