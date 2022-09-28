import { useState } from "react";
import AddSighting from "./AddSightings";

const SightingsTable = ({
  individuals,
  sightings,
  deleteSighting,
  sortHealthy,
}) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <thead>
        <tr>
          <td>Nickname</td>
          <td>Common Name</td>
          <td>
            Health Status
            <button
              onClick={() => {
                setCount(count + 1);
                sortHealthy(count % 2 === 0 ? true : false);
              }}
            >
              <i className="fa fa-filter" aria-hidden="true"></i>
            </button>
          </td>
          <td>Location</td>
          <td>Time Last Seen</td>
          <td>Sighter Email</td>
          <td>Details</td>
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
              <td>{type.email}</td>
              <td>
                <button>See More Details</button>
              </td>
              <td>
                <button
                  value={type.sighting_id}
                  onClick={(e) => deleteSighting(e.currentTarget.value)}
                >
                  <i className="fa fa-trash-o"></i>
                </button>
              </td>
            </tr>
          );
        })}
        <AddSighting individuals={individuals} />
      </tbody>
    </>
  );
};

export default SightingsTable;
