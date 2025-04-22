
import { useState } from "react";
import { Search, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SavedLocation } from "@/types/weather";

interface SearchLocationProps {
  onSearch: (query: string) => void;
  searchResults: SavedLocation[];
  savedLocations: SavedLocation[];
  onSelectLocation: (lat: number, lon: number) => void;
  onSaveLocation: (location: SavedLocation) => void;
  isLoading: boolean;
}

export const SearchLocation = ({
  onSearch,
  searchResults,
  savedLocations,
  onSelectLocation,
  onSaveLocation,
  isLoading
}: SearchLocationProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a location..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>

      {searchResults.length > 0 && (
        <Card className="mt-2">
          <CardContent className="p-2">
            <div className="text-sm font-medium mb-1">Search Results</div>
            <div className="space-y-1">
              {searchResults.map((location, index) => (
                <div
                  key={`${location.name}-${index}`}
                  className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => onSelectLocation(location.lat, location.lon)}
                >
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>
                      {location.name}, {location.country}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSaveLocation(location);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
