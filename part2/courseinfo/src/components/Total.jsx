import React from "react";

const Total = ({ parts }) => (
  <p>
    <b>total of {parts.reduce((a, part) => a + part.exercises, 0)} exercises</b>
  </p>
);

export default Total;
