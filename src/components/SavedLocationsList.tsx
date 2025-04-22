
import { X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SavedLocation } from "@/types/weather";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SavedLocationsListProps {
  locations: SavedLocation[];
  onSelectLocation: (lat: number, lon: number) => void;
  onRemoveLocation: (location: SavedLocation) => void;
}

export const SavedLocationsList = ({
  locations,
  onSelectLocation,
  onRemoveLocation,
}: SavedLocationsListProps) => {
  if (locations.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardContent className="p-2">
        <div className="text-sm font-medium mb-1">Saved Locations</div>
        <ScrollArea className="h-[150px]">
          <div className="space-y-1">
            {locations.map((location, index) => (
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
                    onRemoveLocation(location);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
