export interface Route {
  id: number;
  name: string;
  shortName: string;
  description: string;
  color: string;
  frequency: string;
  isFavorite?: boolean;
  keyNeighborhoods: string[];
  image?: string;
  travelTime?: string;
  startTime?: string;
  endTime?: string;
  distance?: string;
  countBuses?: number;
  coordinatePoints?: Position[];
}

export interface RouteFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface BusMarker {
  id: number;
  position: Position;
  name: string;
}

export interface Position {
  lat: number;
  lng: number;
}
