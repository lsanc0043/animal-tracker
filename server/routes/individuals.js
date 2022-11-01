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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const individuals = await db.one("SELECT * FROM individuals WHERE id=$1", [
      id,
    ]);
    res.send(individuals);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

router.post("/", async (req, res) => {
  const individual = {
    image: req.body.image,
    nickname: req.body.nickname,
    species_id: req.body.species_id,
    created_on: req.body.created_on,
  };
  console.log(individual);
  try {
    const createdIndividual = await db.one(
      "INSERT INTO individuals(nickname, species_id, seen_on, image) VALUES($1, $2, $3, $4) RETURNING * ",
      [
        individual.nickname,
        individual.species_id,
        individual.created_on,
        individual.image,
      ]
    );
    res.send(createdIndividual);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const individual = await db.one("DELETE FROM individuals WHERE id=$1", [
      id,
    ]);
    res.send(individual);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

export default router;
