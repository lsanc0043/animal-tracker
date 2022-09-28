import db from "../db/db-connection.js";
import Router from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const sightings = await db.any(
      "SELECT * FROM sightings ORDER BY sighting_id",
      [true]
    );
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const sightings = await db.one(
      "SELECT * FROM sightings WHERE sighting_id=$1",
      [id]
    );
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

router.post("/", async (req, res) => {
  const sighting = {
    nickname: req.body.nickname,
    common_name: req.body.common_name,
    id: req.body.id,
    healthy: req.body.healthy === "Yes" ? true : false,
    location: req.body.location,
    last_seen: req.body.last_seen,
    email: req.body.email,
    created_on: req.body.created_on,
  };
  console.log(sighting);
  try {
    const sightings = await db.any("SELECT * FROM sightings", [true]);
    let max = await db.one("SELECT max(sighting_id) FROM sightings");
    if (sightings.length === 0) {
      max.max = 0;
    }
    console.log(max.max);
    const createdSighting = await db.one(
      "INSERT INTO sightings(sighting_id, date_time, individual_id, location, healthy, email, created_on) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING * ",
      [
        max.max + 1,
        sighting.last_seen,
        sighting.id,
        sighting.location,
        sighting.healthy,
        sighting.email,
        sighting.created_on,
      ]
    );
    res.send(createdSighting);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e }); 
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const sightings = await db.one(
      "DELETE FROM sightings WHERE sighting_id=$1",
      [id]
    );
    res.send(sightings);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

export default router;
