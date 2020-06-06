import React from "react";

const Languages = ({ languages }) => (
  <ul>
    {languages.map((language) => (
      <li key={language.iso639_1}>{language.name}</li>
    ))}
  </ul>
);

export default Languages;
