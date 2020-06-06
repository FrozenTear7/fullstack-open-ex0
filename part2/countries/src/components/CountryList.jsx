import React from "react";
import Country from "./Country";

const CountryList = ({ countries }) => (
  <div>
    {countries.map((country) => (
      <Country key={country.numericCode} country={country} />
    ))}
  </div>
);

export default CountryList;
