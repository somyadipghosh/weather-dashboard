import { useEffect, useState } from 'react';
import { CurrentWeather } from '@/components/CurrentWeather';
import { ForecastList } from '@/components/ForecastList';
import { SearchLocation } from '@/components/SearchLocation';
import { SavedLocationsList } from '@/components/SavedLocationsList';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useWeather } from '@/hooks/useWeather';

const Index = () => {
  const {
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
  } = useWeather();

  useEffect(() => {
    if (savedLocations.length > 0) {
      const firstLocation = savedLocations[0];
      getWeatherByCoords(firstLocation.lat, firstLocation.lon);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            getWeatherByCoords(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error("Error getting current location:", error);
            getWeatherByCoords(40.7128, -74.0060);
          }
        );
      } else {
        getWeatherByCoords(40.7128, -74.0060);
      }
    }
  }, [savedLocations]);

  if (!apiKey) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-900 dark:to-sky-800">
        <ApiKeyInput onSave={saveApiKey} savedApiKey={apiKey} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-900 dark:to-sky-800">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Weather Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <SearchLocation
              onSearch={searchForLocation}
              searchResults={searchResults}
              savedLocations={savedLocations}
              onSelectLocation={getWeatherByCoords}
              onSaveLocation={saveLocation}
              isLoading={isLoading}
            />

            <SavedLocationsList
              locations={savedLocations}
              onSelectLocation={getWeatherByCoords}
              onRemoveLocation={removeLocation}
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            {error && <ErrorDisplay message={error} />}

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              weatherData && (
                <>
                  <CurrentWeather data={weatherData} />
                  <ForecastList data={weatherData} />
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
