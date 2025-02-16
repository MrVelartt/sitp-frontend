import { Route } from '@app/models';

export const RouteMock: Route[] = [
  {
    id: 1,
    name: 'San Antonio - Hospital',
    shortName: 'R1',
    description:
      'Ruta principal que conecta el centro de la ciudad con la zona norte, pasando por principales avenidas.',
    color: '#2563EB',
    frequency: '10',
    isFavorite: true,
  },
  {
    id: 2,
    name: 'La Madrid - Hospital',
    shortName: 'R2',
    description:
      'Conecta los principales centros comerciales y zonas residenciales del este con el oeste.',
    color: '#16A34A',
    frequency: '15',
  },
  {
    id: 3,
    name: 'Reliquia - Hospital',
    shortName: 'R3',
    description:
      'Ruta circular que recorre el perímetro de la ciudad, conectando puntos estratégicos.',
    color: '#4F46E5',
    frequency: '20',
    isFavorite: true,
  },
  {
    id: 4,
    name: 'Centro - Industrial',
    shortName: 'R4',
    description:
      'Ruta clave para trabajadores, conectando el centro con la zona industrial.',
    color: '#F59E0B',
    frequency: '12',
  },
  {
    id: 5,
    name: 'San José - Universidad',
    shortName: 'R5',
    description:
      'Ruta universitaria que transporta estudiantes entre barrios residenciales y el campus principal.',
    color: '#DC2626',
    frequency: '8',
  },
  {
    id: 6,
    name: 'El Prado - Terminal',
    shortName: 'R6',
    description: 'Conecta el barrio El Prado con la terminal de transportes.',
    color: '#9333EA',
    frequency: '18',
  },
  {
    id: 7,
    name: 'Hospital - Aeropuerto',
    shortName: 'R7',
    description: 'Ruta exprés que conecta el hospital con el aeropuerto.',
    color: '#0D9488',
    frequency: '25',
  },
  {
    id: 8,
    name: 'Centro - Villa Olímpica',
    shortName: 'R8',
    description:
      'Ruta que facilita el acceso a la zona deportiva y recreativa de la ciudad.',
    color: '#EA580C',
    frequency: '14',
  },
  {
    id: 9,
    name: 'Bosques de la Rivera - Hospital',
    shortName: 'R9',
    description:
      'Ruta que atraviesa barrios residenciales y comerciales hasta llegar al hospital.',
    color: '#3B82F6',
    frequency: '10',
  },
  {
    id: 10,
    name: 'La Esperanza - Plaza Central',
    shortName: 'R10',
    description:
      'Conecta el barrio La Esperanza con el centro histórico de la ciudad.',
    color: '#A21CAF',
    frequency: '16',
  },
  {
    id: 11,
    name: 'Miraflores - Estación Central',
    shortName: 'R11',
    description:
      'Ruta con alto tráfico de pasajeros entre la zona alta y la estación de trenes.',
    color: '#65A30D',
    frequency: '20',
  },
  {
    id: 12,
    name: 'San Fernando - Mercado Municipal',
    shortName: 'R12',
    description:
      'Ruta esencial para comerciantes y compradores que se dirigen al mercado central.',
    color: '#E11D48',
    frequency: '12',
  },
  {
    id: 13,
    name: 'Nueva Castilla - Centro',
    shortName: 'R13',
    description:
      'Conexión rápida entre la urbanización Nueva Castilla y el centro de la ciudad.',
    color: '#1E40AF',
    frequency: '9',
  },
  {
    id: 14,
    name: 'Altos del Sol - Estadio',
    shortName: 'R14',
    description:
      'Ruta que facilita el acceso al estadio en días de eventos deportivos.',
    color: '#047857',
    frequency: '15',
  },
  {
    id: 15,
    name: 'Zaragoza - Hospital',
    shortName: 'R15',
    description:
      'Ruta de gran demanda que transporta pacientes y visitantes al hospital desde Zaragoza.',
    color: '#B91C1C',
    frequency: '11',
  },
  {
    id: 16,
    name: 'Granada - Universidad',
    shortName: 'R16',
    description:
      'Ruta universitaria con paradas estratégicas en bibliotecas y zonas de estudio.',
    color: '#7C3AED',
    frequency: '10',
  },
  {
    id: 17,
    name: 'Colinas - Terminal de Buses',
    shortName: 'R17',
    description:
      'Conexión rápida entre la zona residencial Colinas y la terminal de buses intermunicipales.',
    color: '#15803D',
    frequency: '13',
  },
  {
    id: 18,
    name: 'San Luis - Centro',
    shortName: 'R18',
    description:
      'Ruta de alta demanda que conecta San Luis con el casco urbano.',
    color: '#EAB308',
    frequency: '12',
  },
  {
    id: 19,
    name: 'Villa del Rosario - Hospital',
    shortName: 'R19',
    description:
      'Ruta que transporta pacientes y trabajadores de salud al hospital central.',
    color: '#14B8A6',
    frequency: '18',
  },
  {
    id: 20,
    name: 'Centro - Comuna 5',
    shortName: 'R20',
    description:
      'Ruta con recorrido en los barrios más concurridos de la Comuna 5.',
    color: '#DB2777',
    frequency: '17',
  },
  {
    id: 21,
    name: 'Santa Catalina - Universidad',
    shortName: 'R21',
    description:
      'Ruta clave para estudiantes que viven en la zona sur de la ciudad.',
    color: '#2563EB',
    frequency: '9',
  },
  {
    id: 22,
    name: 'Brisas del Norte - Plaza de Mercado',
    shortName: 'R22',
    description:
      'Ruta esencial para comerciantes y compradores del sector norte.',
    color: '#D97706',
    frequency: '14',
  },
  {
    id: 23,
    name: 'Villa Real - Hospital',
    shortName: 'R23',
    description:
      'Ruta con recorridos especiales para emergencias médicas y visitas hospitalarias.',
    color: '#6D28D9',
    frequency: '11',
  },
  {
    id: 24,
    name: 'Parque Central - Zona Franca',
    shortName: 'R24',
    description:
      'Ruta de conexión empresarial entre el centro y la zona de fábricas.',
    color: '#0EA5E9',
    frequency: '16',
  },
  {
    id: 25,
    name: 'El Triunfo - Terminal',
    shortName: 'R25',
    description:
      'Ruta con acceso directo a la terminal de buses y estaciones de transporte público.',
    color: '#B45309',
    frequency: '10',
  },
];
