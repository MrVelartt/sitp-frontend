export interface Route {
  id: number;
  name: string;
  shortName: string;
  description: string;
  color: string;
  frequency: string;
  keyNeighborhoods: string[];
  image: string;
  travelTime: string;
  startTime: string;
  endTime: string;
  distance: string;
  countBuses: number;
  busStops: BusStop[];
  coordinates: Position[];
  isFavorite?: boolean;
}

export interface BusStop {
  id: number;
  name: string;
  position: Position;
  order: number;
  icon: string;
  routes?: Route[];
  color?: string;
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
  color: string;
}

export interface Position {
  lat: number;
  lng: number;
}
