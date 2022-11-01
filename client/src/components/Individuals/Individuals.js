import { useEffect, useState } from "react";
import AddIndividuals from "./AddIndividuals";

const Individuals = () => {
  const [individuals, setIndividuals] = useState([]);
  const [commonName, setCommonName] = useState([]);
  const [names, setNames] = useState([]);
  const [currentTab, setCurrentTab] = useState("");

  const getIndividuals = async () => {
    const response = await fetch("http://localhost:5000/joinedTable");
    const data = await response.json();
    const indivResponse = await fetch("http://localhost:5000/individuals");
    const indivData = await indivResponse.json();
    const obj = {};
    indivData.map((val) => (obj[val.nickname] = []));
    for (let i = 0; i < data.length; i++) {
      obj[data[i].nickname].push(data[i].date_time);
    }
    const times = Object.values(obj).map(
      (val) => val.sort()[val.sort().length - 1]
    );
    indivData.map(
      (val, index) => (val.seen_on = times[index] ? times[index] : val.seen_on)
    );
    setCommonName(data.map((val) => [val.common_name, val.nickname]));
    setIndividuals(indivData);
    setNames(indivData.map((val) => val.nickname));
  };

  useEffect(() => {
    getIndividuals();
  }, [names, currentTab]);

  const deleteIndividual = async (deleteId) => {
    let response = await fetch(
      `http://localhost:5000/individuals/${deleteId}`,
      {
        method: "DELETE",
      }
    );
    await response.json();

    const deleteOne = individuals.filter(
      (individuals) => individuals.id !== Number(deleteId)
    );
    setIndividuals(deleteOne);
    console.log(deleteId);
  };

  return (
    <>
      <thead>
        <tr className="head">
          <td>
            <select onChange={(e) => setCurrentTab(e.target.value)}>
              <option value=""></option>
              {names.map((name, index) => {
                return <option key={index}>{name}</option>;
              })}
            </select>
          </td>
          <td>Id</td>
          <td>Nickname</td>
          <td>Common Name</td>
          <td>Last Seen On</td>
        </tr>
      </thead>
      <tbody>
        <AddIndividuals individuals={individuals} />
        {individuals.map((type, index) => {
          if (type.nickname === currentTab) {
            return (
              <tr key={index}>
                <td>
                  <img src={type.image} alt={type.nickname} />
                </td>
                <td>{index + 1}</td>
                <td>{type.nickname}</td>
                <td>{commonName.find((val) => val[1] === type.nickname)[0]}</td>
                <td>{type.seen_on.slice(0, 10)}</td>
                <td>
                  <button
                    value={type.id}
                    onClick={(e) => deleteIndividual(e.currentTarget.value)}
                  >
                    <i className="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            );
          }
          if (currentTab === "") {
            return (
              <tr key={index}>
                <td>
                  <img src={type.image} alt={type.nickname} />
                </td>
                <td>{index + 1}</td>
                <td>{type.nickname}</td>
                <td>{commonName.find((val) => val[1] === type.nickname)[0]}</td>
                <td>{type.seen_on.slice(0, 10)}</td>
                <td>
                  <button
                    value={type.id}
                    onClick={(e) => deleteIndividual(e.currentTarget.value)}
                  >
                    <i className="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </>
  );
};

export default Individuals;
