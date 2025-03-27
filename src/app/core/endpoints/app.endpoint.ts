import { API_URL } from '@env/environment';

export class AppEndpoint {
  static readonly info = `${API_URL}app-info/`;
  static readonly features = `${API_URL}caracteristicas/`;
}
