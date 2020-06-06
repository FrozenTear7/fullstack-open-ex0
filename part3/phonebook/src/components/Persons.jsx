import React from "react";
import Person from "./Person";

const Persons = ({ persons, filterName, personDeleteOnClick }) => (
  <div>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
      .map((person) => (
        <Person
          key={person.id}
          person={person}
          personDeleteOnClick={personDeleteOnClick}
        />
      ))}
  </div>
);

export default Persons;
