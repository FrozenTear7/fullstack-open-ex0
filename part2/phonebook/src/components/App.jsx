import React, { useState, useEffect } from "react";
import Numbers from "./Numbers";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const nameOnChange = (e) => {
    setNewName(e.target.value);
  };

  const numberOnChange = (e) => {
    setNewNumber(e.target.value);
  };

  const filterOnChange = (e) => {
    setFilterName(e.target.value);
  };

  const personOnSubmit = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterName={filterName} filterOnChange={filterOnChange} />

      <h2>Add a new person</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        personOnSubmit={personOnSubmit}
        nameOnChange={nameOnChange}
        numberOnChange={numberOnChange}
      />

      <h2>Numbers</h2>
      <Numbers persons={persons} filterName={filterName} />
    </div>
  );
};

export default App;
