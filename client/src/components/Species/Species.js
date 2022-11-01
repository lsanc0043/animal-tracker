import { useEffect, useState } from "react";
import AddSpecies from "./AddSpecies";

const Species = () => {
  const [species, setSpecies] = useState([]);
  const getSpecies = async () => {
    const response = await fetch(`http://localhost:5000/species`);
    const data = await response.json();
    setSpecies(data);
  };

  useEffect(() => {
    getSpecies();
  }, [species]);

  const deleteSpecies = async (deleteId) => {
    let response = await fetch(`http://localhost:5000/species/${deleteId}`, {
      method: "DELETE",
    });
    await response.json();

    const deleteOne = species.filter(
      (species) => species.id !== Number(deleteId)
    );
    setSpecies(deleteOne);
  };

  if (species === []) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <thead>
          <tr>
            <td>Id</td>
            <td>Common Name</td>
            <td>Scientific Name</td>
            <td>Population</td>
            <td>Conservation Status Code</td>
            <td>Date Added</td>
          </tr>
        </thead>
        <tbody>
          {species.map((type, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{type.common_name}</td>
                <td>{type.scientific_name}</td>
                <td>{type.population}</td>
                <td>{type.conservation_status_code}</td>
                <td>{type.created_on.slice(0, 10)}</td>
                <td>
                  <button
                    value={type.id}
                    onClick={(e) => deleteSpecies(e.currentTarget.value)}
                  >
                    <i className="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            );
          })}
          <AddSpecies species={species} />
        </tbody>
      </>
    );
  }
};

export default Species;
