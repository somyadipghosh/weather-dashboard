
import axios from 'axios';
import { WeatherData } from '../types/weather';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  // Get the API key and remove any quotes that might be stored with it
  const apiKey = localStorage.getItem('weatherApiKey')?.replace(/"/g, '') || '';
  
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
    
    // Use the OneCall API for forecast data
    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric',
        cnt: 7, // Get 7 days of forecast
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
      forecast: forecastResponse.data.list.slice(0, 7).map((item: any) => ({
        dt: item.dt,
        temp: {
          day: item.main.temp,
          min: item.main.temp_min,
          max: item.main.temp_max,
        },
        weather: item.weather[0],
      })),
    };
    
    console.log('Weather data fetched successfully:', weatherData);
    return weatherData;
  } catch (error: any) {
    console.error('Error fetching weather data:', error.response?.data || error.message);
    throw new Error('Failed to fetch weather data. Please check your API key and try again.');
  }
};

export const searchLocation = async (query: string) => {
  // Get the API key and remove any quotes that might be stored with it
  const apiKey = localStorage.getItem('weatherApiKey')?.replace(/"/g, '') || '';
  
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
  } catch (error: any) {
    console.error('Error searching location:', error.response?.data || error.message);
    throw new Error('Failed to search location. Please check your API key and try again.');
  }
};
