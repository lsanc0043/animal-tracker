import express from "express";
import cors from "cors";
import speciesRouter from "./routes/species.js";
import individualsRouter from "./routes/individuals.js";
import sightingsRouter from "./routes/sightings.js";
import db from "./db/db-connection.js";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/species", speciesRouter);
app.use("/individuals", individualsRouter);
app.use("/sightings", sightingsRouter);

app.get("/joinedTable", async (req, res) => {
  try {
    const allInfo = await db.any(
      "SELECT sightings.sighting_id, individuals.id, individuals.nickname, species.common_name, species.scientific_name, species.population, species.conservation_status_code, sightings.date_time, sightings.location, sightings.healthy, sightings.email, individuals.image FROM individuals LEFT JOIN sightings ON sightings.individual_id = individuals.id LEFT JOIN species ON species.id = individuals.species_id"
    );
    res.send(allInfo);
  } catch (e) {
    res.status(400).json({ e });
  }
});

app.get("/", (req, res) => {
  res.send("hello, this is working!");
});

app.listen(PORT, () => console.log(`Hello, I am listening on port ${PORT}.`));
