import React from "react";

const Person = ({ person, personDeleteOnClick }) => {
  return (
    <div>
      {person.name} {person.number}
      <button type="button" onClick={() => personDeleteOnClick(person)}>
        delete
      </button>
    </div>
  );
};

export default Person;
