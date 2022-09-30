import { useState } from "react";
import AddSighting from "./AddSightings";

const SightingsTable = ({
  individuals,
  sightings,
  deleteSighting,
  sortHealthy,
  sortDate,
}) => {
  const [showHealthy, setShowHealthy] = useState(true);
  const [sortDates, setSortDates] = useState(true);
  const [editItem, setEditItem] = useState("");
  const [isBeingEdited, setIsBeingEdited] = useState(true);
  const [editSpecies, setEditSpecies] = useState({});

  const handleEdit = (e) => {
    console.log(e.currentTarget.value);
    console.log(
      individuals.filter(
        (individual) => individual.sighting_id === Number(e.currentTarget.value)
      )
    );
    setEditSpecies(
      individuals.filter(
        (individual) => individual.sighting_id === Number(e.currentTarget.value)
      )[0]
    );
    setEditItem(e.currentTarget.value);
    setIsBeingEdited(true);
  };

  const edit = (childData) => {
    console.log(childData);
    setIsBeingEdited(childData);
  };

  return (
    <>
      <thead>
        <tr>
          <td></td>
          <td>Nickname</td>
          <td>Common Name</td>
          <td>
            Health Status
            <button
              onClick={() => {
                setShowHealthy((show) => !show);
                sortHealthy(showHealthy);
              }}
            >
              <i className="fa fa-filter" aria-hidden="true"></i>
            </button>
          </td>
          <td>Location</td>
          <td>
            Time Last Seen
            <button
              onClick={() => {
                setSortDates((ascending) => !ascending);
                sortDate(sortDates);
              }}
            >
              <i
                className={sortDates ? "fa fa-sort-amount-asc" : "fa fa-times"}
                aria-hidden="true"
              ></i>
            </button>
          </td>
          <td>Sighter Email</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {sightings.map((type, index) => {
          if (Number(editItem) === type.sighting_id && isBeingEdited) {
            return (
              <AddSighting
                key={index}
                edit={edit}
                isEdit={editItem}
                individuals={individuals}
                editSpecies={editSpecies}
              />
            );
          } else {
            return (
              <tr key={index}>
                <td>
                  <button value={type.sighting_id} onClick={handleEdit}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </button>
                </td>
                <td>{type.nickname}</td>
                <td>{type.common_name}</td>
                <td>
                  {type.healthy.toString() === "true" ? "Healthy" : "Unhealthy"}
                </td>
                <td>{type.location}</td>
                <td>{type.date_time.slice(0, 10)}</td>
                <td>{type.email}</td>
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
          }
        })}
        <AddSighting individuals={individuals} isEdit={false} />
      </tbody>
    </>
  );
};

export default SightingsTable;
