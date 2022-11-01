import { useState, useEffect } from "react";
const date = new Date().toISOString().slice(0, 10);

const AddIndividuals = ({ individuals }) => {
  const [species, setSpecies] = useState([]);
  const [newIndividuals, setNewIndividuals] = useState({
    image: "",
    nickname: "",
    species_id: "",
    created_on: date,
  });

  const getSpecies = async () => {
    const response = await fetch(`http://localhost:5000/species`);
    const data = await response.json();
    setSpecies(data);
  };

  useEffect(() => {
    getSpecies();
  }, [species]);

  const set = (input) => {
    return ({ target: { value } }) => {
      setNewIndividuals((originalValues) => ({
        ...originalValues,
        [input]: value,
      }));
    };
  };

  const handleAdd = async () => {
    const rawResponse = await fetch("http://localhost:5000/individuals", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIndividuals),
    });
    const content = await rawResponse.json();
    individuals.push(content);
    setNewIndividuals({
      image: "",
      nickname: "",
      species_id: "",
      created_on: date,
    });
    console.log(newIndividuals);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          id="add-image"
          placeholder="Paste image URL"
          value={newIndividuals.image}
          onChange={set("image")}
        />
      </td>
      <td></td>
      <td>
        <input
          type="text"
          id="add-nickname"
          value={newIndividuals.nickname}
          onChange={set("nickname")}
        />
      </td>
      <td>
        <select onChange={set("species_id")}>
          <option></option>
          {species.map((oneSpecies, index) => {
            return (
              <option key={index} value={oneSpecies.id}>
                {oneSpecies.common_name}
              </option>
            );
          })}
        </select>
      </td>
      <td>{newIndividuals.created_on}</td>
      <td>
        <button onClick={handleAdd}>Add!</button>
      </td>
    </tr>
  );
};

export default AddIndividuals;
