import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import axios from "axios";
import MainContent from "./MainContent";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filterOnChange = (e) => {
    setFilterCountry(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterCountry={filterCountry} filterOnChange={filterOnChange} />
      <MainContent countries={countries} filterCountry={filterCountry} />
    </div>
  );
};

export default App;
