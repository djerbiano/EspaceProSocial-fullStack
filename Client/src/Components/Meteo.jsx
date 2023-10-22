import styled from "styled-components";
import { useState, useEffect } from "react";
import getWeatherForCity from "../services/weatherService";
import Datetime from "./Datetime";
const ContainerMeteo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.2);
`;

const ContainerInputAndButton = styled.div`
  & input {
    width: 150px;
    height: 30px;
    border: none;
    border-radius: 5px;
    padding-left: 10px;
    margin-right: 10px;
  }
  & button {
    width: 80px;
    height: 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const ContainerData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CountryName = styled.div`
  min-width: 50%;
  text-align: center;
  margin-bottom: 10px;

  p {
    font-size: 20px;
    font-weight: bold;
  }
`;

const ContainerDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
`;
const ContainerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;
const ContainerIcon = styled.div`
  width: 30%;
  text-align: center;
`;

const Details = styled.div`
  width: 50%;
`;

function Meteo() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState("");

  const getWeatherIcon = (iconParameter) => {
    if (!iconParameter) {
      return <img src="https://openweathermap.org/img/wn/01n@2x.png" alt="" />;
    }
    const icon = `https://openweathermap.org/img/wn/${iconParameter}@2x.png`;
    return <img src={icon} alt="" />;
  };
  const searchWeather = (city) => {
    getWeatherForCity(city)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            alert(data.message);
           window.location.reload();
          });
        }
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
      });
  };
  useEffect(() => {
    searchWeather("mexico");
  }, []);
  return (
    <ContainerMeteo>
      <h1>Méteo</h1>
      <form onSubmit={searchWeather}>
        <ContainerInputAndButton>
          <input
            type="text"
            name="city"
            placeholder="La ville ?"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (query === "") {
                return searchWeather("paris");
              }
              searchWeather(query);
            }}
          >
            Rechercher
          </button>
        </ContainerInputAndButton>
      </form>
      <ContainerData>
        <CountryName>
          <p>{weatherData && weatherData.name}</p>
        </CountryName>

        <ContainerDetails>
          <ContainerContent>
            <ContainerIcon>
              {getWeatherIcon(weatherData && weatherData.weather[0].icon)}
            </ContainerIcon>

            <Details>
              Temp : <span>{weatherData && weatherData.main.temp}&deg;C</span>
              <p>
                Description :{weatherData && weatherData.weather[0].description}
              </p>
              <p>Max :{weatherData && weatherData.main.temp_max}&deg;C</p>
              <p>Min :{weatherData && weatherData.main.temp_min}&deg;C</p>
              <p>Humidité :{weatherData && weatherData.main.humidity}%</p>
            </Details>
          </ContainerContent>
        </ContainerDetails>
      </ContainerData>
      <Datetime />
    </ContainerMeteo>
  );
}

export default Meteo;
