import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Species from "./components/Species/Species";
import Sightings from "./components/Sightings/Sightings";
import Individuals from "./components/Individuals/Individuals";

function App() {
  return (
    <div className="App">
      <Router>
        <header>Animal Sighting Tracker</header>
        <div className="card">
          <div className="card-header">
            <NavBar />
          </div>
          <table className="table">
            <Routes>
              <Route path="/sightings" element={<Sightings />} />
              <Route path="/species" element={<Species />} />
              <Route path="/individuals" element={<Individuals />} />
            </Routes>
          </table>
        </div>
      </Router>
      {/* <Details /> */}
      {/* <Sightings /> */}
    </div>
  );
}

export default App;
