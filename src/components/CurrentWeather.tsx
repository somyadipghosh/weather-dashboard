
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherData } from "@/types/weather";

interface CurrentWeatherProps {
  data: WeatherData;
}

export const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  if (!data || !data.current) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Card className="w-full overflow-hidden bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-900 dark:to-sky-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">{data.location.name}, {data.location.country}</CardTitle>
            <p className="text-sm text-muted-foreground">{formatDate(Date.now())}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <WeatherIcon iconCode={data.current.weather.icon} size={64} />
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold">{Math.round(data.current.temp)}°C</div>
              <div className="text-muted-foreground capitalize">{data.current.weather.description}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 md:mt-0">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Feels like</span>
              <span className="font-medium">{Math.round(data.current.feels_like)}°C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Wind</span>
              <span className="font-medium">{data.current.wind_speed} m/s</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Humidity</span>
              <span className="font-medium">{data.current.humidity}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
