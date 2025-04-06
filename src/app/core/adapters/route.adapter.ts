import { convertNumberMinutesToHMString, convertTimeTo12HourFormat } from '@shared/utils';
import { Route } from '../models';

export const routeAdapter = (routes: any[]): Route[] =>
  routes.map((route) => routeFormat(route)) || [];

export const routeDetailAdapter = (route: any): Route => routeFormat(route);

const routeFormat = (route: any): Route => ({
  id: route.id,
  name: route.name_route,
  shortName: route.short_name_route || 'R',
  description: route.description_route || 'Ruta sin descripción',
  color: route.color_route || '#2563EB',
  frequency: route.frequency || 0,
  keyNeighborhoods: route.barrios || ['Alborada'],
  image: route.image_route || 'assets/images/map.png',
  travelTime: convertNumberMinutesToHMString(route.time_travel),
  startTime: convertTimeTo12HourFormat(route.start_time_route),
  endTime: convertTimeTo12HourFormat(route.end_time_route),
  distance: `${route.distance_route || 0} km`,
  countBuses: route.quantity_bus || 0,
});