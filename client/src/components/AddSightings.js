import { useState } from "react";

const AddSighting = ({ individuals }) => {
  const [newSighting, setNewSighting] = useState({
    nickname: "",
    common_name: "",
    healthy: "",
    location: "",
    last_seen: "",
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
          <button onClick={() => console.log(newSighting)}>Add!</button>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default AddSighting;
