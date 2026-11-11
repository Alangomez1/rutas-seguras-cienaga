export type IncidentType = 'inundacion' | 'alcantarilla' | 'hueco' | 'transitable' | 'arbol' | 'precaucion';

export type SeverityLevel = 'peligro' | 'precaucion' | 'transitable';

export type SkinTheme = 'institucional' | 'nocturno' | 'emergencia' | 'radar';

export type NavView = 'inicio' | 'mapa' | 'asistente' | 'reportar' | 'emergencias';

export interface IncidentReport {
  id: string;
  barrio: string;
  direccion: string;
  tipo: IncidentType;
  severidad: SeverityLevel;
  nivelAgua: string;
  descripcion: string;
  lat: number;
  lng: number;
  fecha: string;
  autor: string;
  foto?: string;
  verificado: boolean;
}

export interface RouteSuggestion {
  id: string;
  nombre: string;
  origen: string;
  destino: string;
  distancia: string;
  tiempo: string;
  estado: string;
  desvio: string;
  coords: [number, number][];
}

export interface DynamicRealTimeRoute {
  id: string;
  origen: string;
  destino: string;
  distancia: string;
  tiempoEstimado: string;
  safePoints: [number, number][];
  dangerPoints: [number, number][];
  peligrosEvitados: string[];
  maniobras: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ia';
  text: string;
  timestamp: string;
  matchedBarrio?: string | null;
}

export interface EmergencyContact {
  entidad: string;
  linea: string;
  descripcion: string;
  color: string;
}
