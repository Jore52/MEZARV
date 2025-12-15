export interface Artwork {
  id: string;
  title: string;
  category: 'Escultura' | 'Pintura' | 'Instalación' | 'Surrealismo' | 'Abstracto';
  year: number;
  imageUrl: string;
  dimensions: string;
  technique?: string; // Nuevo campo
  author?: string;    // Nuevo campo
  description?: string; // Opcional, ya no se mostrará en UI principal
}

export interface Certificate {
  id: string;
  title: string;
  institution: string;
  year: number;
  description: string;
  imageUrl?: string; 
  icon?: string;
}

export interface ProcessItem {
  id: string;
  type: 'video' | 'image';
  url: string; 
  title: string;
  status: 'Bocetaje' | 'Primera Capa' | 'Detallado' | 'Secado' | 'Barnizado' | 'En Proceso' | 'Experimental' | 'Finalizado';
  date: string;
  description?: string;
  isVertical?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  description: string;
  status: 'Abierto' | 'Lleno' | 'Finalizado' | 'Próximamente';
  image: string;
  category: 'workshop' | 'culture';
}