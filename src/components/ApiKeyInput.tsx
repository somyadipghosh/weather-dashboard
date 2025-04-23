
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Info } from "lucide-react";

interface ApiKeyInputProps {
  onSave: (apiKey: string) => boolean;
  savedApiKey: string;
}

export const ApiKeyInput = ({ onSave, savedApiKey }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState(savedApiKey);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = () => {
    setIsSubmitting(true);
    const success = onSave(apiKey);
    setIsSubmitting(false);
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
          
          <div className="flex items-start gap-2 text-amber-600 bg-amber-50 p-3 rounded-md">
            <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Important Note:</p>
              <p>New API keys may take up to 2 hours to activate. If you experience issues, please wait before trying again.</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSave} 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save API Key"}
        </Button>
      </CardFooter>
    </Card>
  );
};
