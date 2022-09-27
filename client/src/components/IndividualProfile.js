import { useEffect, useState } from "react";

const Details = () => {
  const [species, setSpecies] = useState(null);
  const getSpecies = async () => {
    const response = await fetch(
      `http://localhost:5000/individuals/joinedTable`
    );
    const data = await response.json();
    console.log(data);
    setSpecies(data);
  };

  useEffect(() => {
    getSpecies();
  }, []);

  if (!species) {
    return <>Loading...</>;
  } else {
    return (
      <div className="card">
        <div className="card-header">Species</div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nickname</th>
              <th>Common Name</th>
              <th>Scientific Name</th>
              <th>Population</th>
              <th>Conservation Status Code</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {species.map((type, index) => {
              return (
                <tr key={index}>
                  <th>{type.id}</th>
                  <th>{type.nickname}</th>
                  <th>{type.common_name}</th>
                  <th>{type.scientific_name}</th>
                  <th>{type.population}</th>
                  <th>{type.conservation_status_code}</th>
                  <th>{type.created_on.slice(0, 10)}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Details;
