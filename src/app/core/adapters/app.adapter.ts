import { Feature, Start } from '../models';

export const infoStartAdapter = (response: [any]): Start => {
  const info = response[0];
  return {
    id: info.id,
    logo: info.icono_app,
    title: info.nombre_app,
    description: info.descripcion_app,
    features: featureAdapter(info.caracteristicas),
  };
};

export const featureAdapter = (features: any[]): Feature[] =>
  features.map((feature) => ({
    id: feature.id,
    icon: feature.icono,
    title: feature.nombre_caracteristica,
    description: feature.descripcion_caracteristica,
  }));
