
import { 
  Cloud, 
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  CloudSun
} from "lucide-react";

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  color?: string;
}

export const WeatherIcon = ({ iconCode, size = 24, color }: WeatherIconProps) => {
  // Map OpenWeatherMap icon codes to Lucide icons
  const getIconComponent = () => {
    switch (iconCode) {
      case '01d': // clear sky day
      case '01n': // clear sky night
        return <Sun size={size} color={color} />;
      case '02d': // few clouds day
      case '02n': // few clouds night
        return <CloudSun size={size} color={color} />;
      case '03d': // scattered clouds day
      case '03n': // scattered clouds night
      case '04d': // broken clouds day
      case '04n': // broken clouds night
        return <Cloud size={size} color={color} />;
      case '09d': // shower rain day
      case '09n': // shower rain night
        return <CloudDrizzle size={size} color={color} />;
      case '10d': // rain day
      case '10n': // rain night
        return <CloudRain size={size} color={color} />;
      case '11d': // thunderstorm day
      case '11n': // thunderstorm night
        return <CloudLightning size={size} color={color} />;
      case '13d': // snow day
      case '13n': // snow night
        return <CloudSnow size={size} color={color} />;
      default:
        return <Cloud size={size} color={color} />;
    }
  };

  return getIconComponent();
};
