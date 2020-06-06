import React from "react";

const Filter = ({ filterName, filterOnChange }) => (
  <div>
    filter shown with:
    <input value={filterName} onChange={filterOnChange} />
  </div>
);

export default Filter;
