import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const tabs = ["sightings", "species", "individuals"];
  const tabNames = ["Sightings", "Species", "Individuals"];
  const [currentTab, setCurrentTab] = useState("/");

  return (
    <>
      {tabs.map((tab, index) => {
        return (
          <Link
            key={tab}
            to={tab}
            onClick={() => setCurrentTab(tab)}
            className={currentTab === tab ? "nav-bar nav-active" : "nav-bar"}
          >
            {tabNames[index]}
          </Link>
        );
      })}
    </>
  );
};

export default NavBar;
