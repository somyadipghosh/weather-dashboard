
import { Card } from "@/components/ui/card";
import { WeatherIcon } from "./WeatherIcon";

interface ForecastItemProps {
  date: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: {
    icon: string;
    description: string;
  };
}

export const ForecastItem = ({ date, temp, weather }: ForecastItemProps) => {
  const formatDay = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <Card className="flex flex-col items-center p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
      <p className="font-medium">{formatDay(date)}</p>
      <WeatherIcon iconCode={weather.icon} size={36} />
      <div className="mt-1 text-sm">
        <span className="font-medium">{Math.round(temp.max)}° </span>
        <span className="text-muted-foreground">{Math.round(temp.min)}°</span>
      </div>
      <p className="text-xs text-center text-muted-foreground capitalize mt-1">{weather.description}</p>
    </Card>
  );
};
