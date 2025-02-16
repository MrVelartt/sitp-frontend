export interface Route {
  id: number;
  name: string;
  shortName: string;
  description: string;
  color: string;
  frequency: string;
  isFavorite?: boolean;
}
