import React, { useState, useEffect } from "react";
import Persons from "./Persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import personsService from "../services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    personsService
      .getAllPersons()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log("Could not fetch persons", error);
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

    const personExists = persons.find((person) => person.name === newName);

    if (personExists) {
      if (
        window.confirm(`${newName} is already added to phonebook, 
      replace the old number with a new one?`)
      ) {
        const updatedPerson = { ...personExists, number: newNumber };

        personsService
          .updatePerson(updatedPerson)
          .then(() => {
            setPersons(
              persons.map((person) => {
                if (person.id === personExists.id) {
                  return updatedPerson;
                } else {
                  return person;
                }
              })
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log(
              `Could not update ${personExists.name}'s number`,
              error
            );
          });
      }
    } else {
      personsService
        .createPerson({ name: newName, number: newNumber })
        .then((response) => {
          setPersons([...persons, response.data]);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log(`Could not add ${newName}`, error);
        });
    }
  };

  const personDeleteOnClick = (personDelete) => {
    if (window.confirm(`Delete ${personDelete.name}`)) {
      personsService
        .deletePerson(personDelete.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personDelete.id));
        })
        .catch((error) => {
          console.log(`Could not delete ${personDelete.name}`, error);
        });
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
      <Persons
        persons={persons}
        filterName={filterName}
        personDeleteOnClick={personDeleteOnClick}
      />
    </div>
  );
};

export default App;
