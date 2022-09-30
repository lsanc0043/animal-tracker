import { useEffect, useState } from "react";
import SightingsTable from "./SightingsTable";

const Sightings = () => {
  const [individuals, setIndividuals] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [sortHealth, setSortHealth] = useState(false);
  const [sortDates, setSortDate] = useState(false);
  const getIndividuals = async () => {
    const response = await fetch(`http://localhost:5000/joinedTable`);
    const data = await response.json();
    setIndividuals(data);
    filter(data);
  };

  const sortHealthy = (bool) => {
    setSortHealth(bool);
  };

  const sortDate = (bool) => {
    setSortDate(bool);
  };

  const filter = async (data) => {
    if (data.length !== 0) {
      if (sortDates) {
        const response = await fetch(`http://localhost:5000/joinedTableDates`);
        const dataDate = await response.json();
        const filt2 = dataDate.filter(
          (individual) => individual.sighting_id !== null
        );
        setSightings(filt2);
      } else {
        const filt = data.filter(
          (individual) => individual.sighting_id !== null
        );
        setSightings(filt);
      }

      if (sortHealth) {
        setSightings(data.filter((individual) => individual.healthy === true));
      }
    }
  };

  useEffect(() => {
    getIndividuals();
    // eslint-disable-next-line
  }, [individuals, sortHealth, sortDates]);

  const deleteSighting = async (deleteId) => {
    console.log(deleteId);
    let response = await fetch(`http://localhost:5000/sightings/${deleteId}`, {
      method: "DELETE",
    });
    await response.json();

    const deleteSightings = sightings.filter(
      (sighting) => sighting.sighting_id !== Number(deleteId)
    );
    console.log(deleteSightings);
    setSightings(deleteSightings);
  };

  return (
    <SightingsTable
      individuals={individuals}
      sightings={sightings}
      deleteSighting={deleteSighting}
      sortHealthy={sortHealthy}
      sortDate={sortDate}
    />
  );
};

export default Sightings;
