import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants.js";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filteredOptions[0]?.url;
  const weatherOptionCondition = filteredOptions[0]?.condition;
  const weatherOptionDay = filteredOptions[0]?.day;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOptionUrl}
        alt={`Card showing ${
          weatherOptionDay ? "day" : "night"
        }time ${weatherOptionCondition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
