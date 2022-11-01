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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const species = await db.one("SELECT * FROM species WHERE id=$1", [id]);
    res.send(species);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

router.post("/", async (req, res) => {
  const species = {
    common_name: req.body.common_name,
    scientific_name: req.body.scientific_name,
    population: req.body.population,
    conservation_status_code: req.body.conservation_status_code,
    created_on: req.body.created_on,
  };
  console.log(species);
  try {
    const createdSpecies = await db.one(
      "INSERT INTO species(common_name, scientific_name, population, conservation_status_code, created_on) VALUES($1, $2, $3, $4, $5) RETURNING * ",
      [
        species.common_name,
        species.scientific_name,
        species.population,
        species.conservation_status_code,
        species.created_on,
      ]
    );
    res.send(createdSpecies);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const species = await db.one("DELETE FROM species WHERE id=$1", [id]);
    res.send(species);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

export default router;
