import { formatMinutesToString } from '@shared/utils';
import { Route } from '../models';

export const routeAdapter = (routes: any[]): Route[] =>
  routes.map((route) => ({
    id: route.id,
    name: route.name_route,
    frequency: route.frequency_route,
    description: route.description_route,
    color: route.color_route,
    shortName: route.short_name_route || 'R',
    keyNeighborhoods: route.key_neighborhoods || ['Alborada'],
  }));

export const routeDetailAdapter = (route: any): Route => {
  return {
    id: route.id,
    name: route.name_route,
    shortName: route.short_name_route || 'R',
    description: route.description_route,
    color: route.color_route || '',
    frequency: route.frequency,
    keyNeighborhoods: route.barrios || ['Alborada'],
    image: route.image_route,
    travelTime: formatMinutesToString(route.time_travel),
    startTime: route.start_time_route,
    endTime: route.end_time_route,
    distance: `${route.distance_route} km`,
    countBuses: route.quantity_bus,
  };
};
