import React, { useState, useEffect } from "react";
import Languages from "./Languages";
import axios from "axios";

const CountryDetails = ({ country }) => {
  const [countryWeather, setCountryWeather] = useState();

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      )
      .then((response) => {
        setCountryWeather(response.data);
      })
      .catch((error) => {
        console.log("Could not fetch weather data for this city!", error);
      });
  }, [country.capital, country.name]);

  console.log(countryWeather);

  return (
    <div>
      <h2>{country.name}</h2>
      capital {country.capital} <br />
      population {country.population}
      <Languages languages={country.languages} />
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        style={{ width: "15%" }}
      />
      {countryWeather ? (
        <div>
          <h2>Weather in {country.capital}</h2>
          <b>temperature: </b>
          {countryWeather.main.temp} Celsius
          <br />
          <b>pressure: </b>
          {countryWeather.main.pressure} hPa
          <br />
          <b>wind: </b>
          {countryWeather.wind.speed} m/s, {countryWeather.wind.deg} degrees
          <br />
        </div>
      ) : (
        <h2>Could not fetch weather data for this city!</h2>
      )}
    </div>
  );
};

export default CountryDetails;
