import {
  convertNumberMinutesToHMString,
  convertTimeTo12HourFormat,
} from '@shared/utils';
import { BusStop, Position, Route } from '../models';

export const routeAdapter = (routes: any[]): Route[] =>
  routes.map((route) => routeFormat(route)) || [];

export const routeDetailAdapter = (route: any): Route => routeFormat(route);

const routeFormat = (route: any): Route => ({
  id: route.id,
  name: route.name_route,
  shortName: route.short_name || 'R',
  description: route.description_route || 'Ruta sin descripción',
  color: route.color_route || '#2563EB',
  frequency: route.frequency || 0,
  keyNeighborhoods: route.barrios || ['Alborada'],
  image: route.image_route || 'assets/images/map.png',
  travelTime: convertNumberMinutesToHMString(route.time_travel),
  startTime: convertTimeTo12HourFormat(route.start_time_route),
  endTime: convertTimeTo12HourFormat(route.end_time_route),
  distance: String(route.distance_route ?? 0).includes('km')
    ? route.distance_route
    : `${route.distance_route || 0} km`,
  busStops: busStopAdapter(route.paradas),
  countBuses: route.quantity_bus || 0,
  coordinates: coordenateAdapter(route.coordenadas),
});

const coordenateAdapter = (coordenates: any[]): Position[] =>
  coordenates?.map((coordenate) => ({
    lat: coordenate.lat,
    lng: coordenate.lon,
  })) || [];

export const busStopAdapter = (busStops: any[]): BusStop[] =>
  busStops?.map((busStop) => ({
    id: busStop.id,
    name: busStop.nombre,
    position: {
      lat: busStop.lat,
      lng: busStop.lon,
    },
    order: busStop.orden,
    icon: busStop.icono,
    routes: busStop.rutas ? routeAdapter(busStop.rutas) : [],
    color: busStop.rutas ? busStop.rutas[0]?.color : '#2563EB',
  })) || [];
