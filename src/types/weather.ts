
export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
  };
  forecast: Array<{
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
  }>;
}

export interface SavedLocation {
  name: string;
  country: string;
  lat: number;
  lon: number;
}
