
import axios from 'axios';
import { WeatherData } from '../types/weather';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const apiKey = localStorage.getItem('weatherApiKey') || '';
  
  try {
    // Get current weather
    const currentResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric',
      },
    });
    
    // Get forecast data
    const forecastResponse = await axios.get(`${BASE_URL}/onecall`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric',
        exclude: 'minutely,hourly',
      },
    });
    
    const weatherData: WeatherData = {
      location: {
        name: currentResponse.data.name,
        country: currentResponse.data.sys.country,
        lat,
        lon,
      },
      current: {
        temp: currentResponse.data.main.temp,
        feels_like: currentResponse.data.main.feels_like,
        humidity: currentResponse.data.main.humidity,
        wind_speed: currentResponse.data.wind.speed,
        weather: currentResponse.data.weather[0],
      },
      forecast: forecastResponse.data.daily.slice(0, 7).map((day: any) => ({
        dt: day.dt,
        temp: {
          day: day.temp.day,
          min: day.temp.min,
          max: day.temp.max,
        },
        weather: day.weather[0],
      })),
    };
    
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data. Please try again.');
  }
};

export const searchLocation = async (query: string) => {
  const apiKey = localStorage.getItem('weatherApiKey') || '';
  
  try {
    const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: query,
        limit: 5,
        appid: apiKey,
      },
    });
    
    return response.data.map((location: any) => ({
      name: location.name,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
    }));
  } catch (error) {
    console.error('Error searching location:', error);
    throw new Error('Failed to search location. Please try again.');
  }
};
