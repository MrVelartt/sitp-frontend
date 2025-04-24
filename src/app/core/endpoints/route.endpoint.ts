import { API_URL } from '@env/environment';

export class RouteEndpoint {
  static readonly routes = `${API_URL}rutas/`;
  static readonly busStops = `${API_URL}paradas/`;
}
