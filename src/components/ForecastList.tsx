
import { ForecastItem } from "./ForecastItem";
import { WeatherData } from "@/types/weather";

interface ForecastListProps {
  data: WeatherData;
}

export const ForecastList = ({ data }: ForecastListProps) => {
  if (!data || !data.forecast || data.forecast.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">7-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {data.forecast.map((day) => (
          <ForecastItem
            key={day.dt}
            date={day.dt}
            temp={day.temp}
            weather={{
              icon: day.weather.icon,
              description: day.weather.description,
            }}
          />
        ))}
      </div>
    </div>
  );
};
