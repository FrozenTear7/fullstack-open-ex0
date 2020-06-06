import React, { useState } from "react";
import CountryDetails from "./CountryDetails";

const Country = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      {country.name}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>show</button>
      {showDetails && <CountryDetails country={country} />}
    </div>
  );
};

export default Country;
