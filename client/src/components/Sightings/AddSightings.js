import { useState } from "react";
const date = new Date().toISOString().slice(0, 10);

const AddSighting = ({ individuals }) => {
  const [newSighting, setNewSighting] = useState({
    nickname: "",
    common_name: "",
    id: "",
    healthy: "",
    location: "",
    last_seen: "",
    email: "",
    created_on: date,
  });
  const [nicknameExists, setNicknameExists] = useState(false);

  const set = (input) => {
    return ({ target: { value, id } }) => {
      if (id === "add-nickname") {
        const filter = individuals.filter(
          (individual) =>
            individual.nickname.toLowerCase() === value.toLowerCase()
        );
        if (filter.length !== 0) {
          console.log("exists!");
          setNicknameExists(true);
          setNewSighting((originalValues) => ({
            ...originalValues,
            common_name: filter[0].common_name,
            id: filter[0].id,
          }));
        } else {
          setNicknameExists(false);
        }
      }
      setNewSighting((originalValues) => ({
        ...originalValues,
        [input]: value,
      }));
    };
  };

  const handleAdd = async () => {
    const rawResponse = await fetch("http://localhost:5000/sightings", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSighting),
    });
    const content = await rawResponse.json();
    individuals.push(content);
    setNicknameExists(false);
    setNewSighting({
      nickname: "",
      common_name: "",
      id: "",
      healthy: "",
      location: "",
      last_seen: "",
      email: "",
      created_on: date,
    });
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          id="add-nickname"
          value={newSighting.nickname}
          onChange={set("nickname")}
        />
      </td>
      <td>{nicknameExists ? newSighting.common_name : ""}</td>
      <td>
        {nicknameExists ? (
          <>
            <select onChange={set("healthy")}>
              <option></option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </>
        ) : (
          ""
        )}
      </td>
      <td>
        {newSighting.healthy !== "" ? (
          <input
            type="text"
            id="add-location"
            value={newSighting.location}
            onChange={set("location")}
          />
        ) : (
          ""
        )}
      </td>
      <td>
        {newSighting.location !== "" ? (
          <input
            type="date"
            id="add-last-seen"
            value={newSighting.last_seen}
            onChange={set("last_seen")}
          />
        ) : (
          ""
        )}
      </td>
      <td>
        {newSighting.last_seen !== "" ? (
          <input
            type="email"
            id="add-email"
            value={newSighting.email}
            onChange={set("email")}
          />
        ) : (
          ""
        )}
      </td>
      <td>
        {newSighting.last_seen !== "" ? (
          <button onClick={handleAdd}>Add!</button>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default AddSighting;
