export interface Route {
  id: number;
  name: string;
  shortName: string;
  description: string;
  color: string;
  frequency: string;
  isFavorite?: boolean;
  image?: string;
  travelTime?: string;
  startTime?: string;
  endTime?: string;
  distance?: string;
  countBuses?: number;
  keyNeighborhoods?: string[];
}

export interface RouteFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}
