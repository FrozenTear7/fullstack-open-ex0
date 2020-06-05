import React from "react";
import CountryDetails from "./CountryDetails";
import CountryList from "./CountryList";

const MainContent = ({ countries, filterCountry }) => {
  const matchingCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filterCountry.toLowerCase())
  );

  if (matchingCountries.length === 1) {
    return <CountryDetails country={matchingCountries[0]} />;
  } else if (matchingCountries.length > 1 && matchingCountries.length <= 10) {
    return <CountryList countries={matchingCountries} />;
  } else if (matchingCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else {
    return <span />; // When the countries are not yet fetched, a loading screen would be more suitable
  }
};

export default MainContent;
