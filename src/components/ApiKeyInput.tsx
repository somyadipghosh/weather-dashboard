
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ApiKeyInputProps {
  onSave: (apiKey: string) => void;
  savedApiKey: string;
}

export const ApiKeyInput = ({ onSave, savedApiKey }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState(savedApiKey);

  const handleSave = () => {
    onSave(apiKey);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">OpenWeatherMap API Key</CardTitle>
        <CardDescription>
          Please enter your API key from OpenWeatherMap to fetch weather data.
          You can get a free API key by signing up at <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">openweathermap.org</a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full">
          Save API Key
        </Button>
      </CardFooter>
    </Card>
  );
};
