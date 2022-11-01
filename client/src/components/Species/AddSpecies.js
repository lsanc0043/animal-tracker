import { useState } from "react";
const date = new Date().toISOString().slice(0, 10);

const AddSpecies = ({ species }) => {
  const [newSpecies, setNewSpecies] = useState({
    common_name: "",
    scientific_name: "",
    population: "",
    conservation_status_code: "",
    created_on: date,
  });

  const set = (input) => {
    return ({ target: { value } }) => {
      setNewSpecies((originalValues) => ({
        ...originalValues,
        [input]: value,
      }));
    };
  };

  const handleAdd = async () => {
    const rawResponse = await fetch("http://localhost:5000/species", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSpecies),
    });
    const content = await rawResponse.json();
    species.push(content);
    setNewSpecies({
      common_name: "",
      scientific_name: "",
      population: "",
      conservation_status_code: "",
      created_on: date,
    });
  };

  return (
    <tr>
      <td></td>
      <td>
        <input
          type="text"
          id="add-common_name"
          value={newSpecies.common_name}
          onChange={set("common_name")}
        />
      </td>
      <td>
        <input
          type="text"
          id="add-scientific_name"
          value={newSpecies.scientific_name}
          onChange={set("scientific_name")}
        />
      </td>
      <td>
        <input
          type="text"
          id="add-population"
          value={newSpecies.population}
          onChange={set("population")}
        />
      </td>
      <td>
        <input
          type="text"
          id="add-status-code"
          value={newSpecies.conservation_status_code}
          onChange={set("conservation_status_code")}
        />
      </td>
      <td>{newSpecies.created_on}</td>
      <td>
        <button onClick={handleAdd}>Add!</button>
      </td>
    </tr>
  );
};

export default AddSpecies;
