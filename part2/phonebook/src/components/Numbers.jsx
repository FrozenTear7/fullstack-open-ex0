import React from "react";
import Person from "./Person";

const Numbers = ({ persons, filterName }) => (
  <div>
    {persons
      .filter((person) => person.name.toLowerCase().includes(filterName))
      .map((person) => (
        <Person key={person.name} person={person} />
      ))}
  </div>
);

export default Numbers;
