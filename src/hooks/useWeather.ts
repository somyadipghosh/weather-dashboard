
import { useState, useEffect } from 'react';
import { fetchWeatherData, searchLocation } from '../services/weatherService';
import { WeatherData, SavedLocation } from '../types/weather';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from '@/components/ui/use-toast';

export const useWeather = () => {
  const { toast } = useToast();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SavedLocation[]>([]);
  const [savedLocations, setSavedLocations] = useLocalStorage<SavedLocation[]>('savedLocations', []);
  const [apiKey, setApiKey] = useLocalStorage<string>('weatherApiKey', '');
  
  const getWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchWeatherData(lat, lon);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const searchForLocation = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const results = await searchLocation(query);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search for location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveLocation = (location: SavedLocation) => {
    // Check if location is already saved
    if (!savedLocations.some(loc => 
      loc.lat === location.lat && loc.lon === location.lon
    )) {
      setSavedLocations([...savedLocations, location]);
    }
  };
  
  const removeLocation = (location: SavedLocation) => {
    setSavedLocations(
      savedLocations.filter(loc => 
        !(loc.lat === location.lat && loc.lon === location.lon)
      )
    );
  };

  const saveApiKey = (key: string) => {
    // Basic validation for OpenWeatherMap API key
    const trimmedKey = key.trim();
    if (trimmedKey && trimmedKey.length > 10) {
      setApiKey(trimmedKey);
      toast({
        title: "API Key Saved",
        description: "Your OpenWeatherMap API key has been successfully saved.",
      });
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenWeatherMap API key.",
        variant: "destructive"
      });
    }
  };
  
  return {
    weatherData,
    isLoading,
    error,
    searchResults,
    savedLocations,
    apiKey,
    getWeatherByCoords,
    searchForLocation,
    saveLocation,
    removeLocation,
    saveApiKey,
  };
};
