export interface Start {
  id: number;
  logo: string;
  title: string;
  description: string;
  features: Feature[];
}

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}
