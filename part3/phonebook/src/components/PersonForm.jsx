import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  personOnSubmit,
  nameOnChange,
  numberOnChange,
}) => (
  <form onSubmit={personOnSubmit}>
    <div>
      name:
      <input value={newName} onChange={nameOnChange} />
    </div>
    <div>
      number:
      <input value={newNumber} onChange={numberOnChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
