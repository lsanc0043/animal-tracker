import { useEffect, useState } from "react";
import AddSighting from "./AddSightings";

const Sightings = () => {
  const [individuals, setIndividuals] = useState([]);
  const [sightings, setSightings] = useState([]);
  const getIndividuals = async () => {
    const response = await fetch(`http://localhost:5000/joinedTable`);
    const data = await response.json();
    console.log(data);
    setIndividuals(data);
    filter(data);
  };

  const filter = (data) => {
    if (data.length !== 0) {
      setSightings(data.filter((individual) => individual.location !== null));
    }
  };

  useEffect(() => {
    getIndividuals();
  });

  const handleClick = (e) => {
    console.log(e.currentTarget.value);
    // deleteEvent(e.currentTarget.value);
  };

  return (
    <div className="card">
      <div className="card-header">Sightings</div>
      <table className="table">
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Common Name</th>
            <th>Health Status</th>
            <th>Location</th>
            <th>Time Last Seen</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {sightings.map((type, index) => {
            return (
              <tr key={index}>
                <td>{type.nickname}</td>
                <td>{type.common_name}</td>
                <td>
                  {type.healthy.toString() === "true" ? "Healthy" : "Unhealthy"}
                </td>
                <td>{type.location}</td>
                <td>{type.date_time.slice(0, 10)}</td>
                <td>
                  <img src={type.image} alt={`${type.common_name}`} />
                </td>
                <td>
                  <button value={type.id} onClick={handleClick}>
                    <i className="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            );
          })}
          <AddSighting individuals={individuals} />
        </tbody>
      </table>
    </div>
  );
  // }
};

export default Sightings;
