import React from "react";

const Filter = ({ filterCountry, filterOnChange }) => (
  <div>
    filter shown with: <input value={filterCountry} onChange={filterOnChange} />
  </div>
);

export default Filter;
