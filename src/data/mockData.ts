import { IncidentReport, RouteSuggestion, EmergencyContact } from '../types';

export const CIENAGA_CENTER: [number, number] = [11.0069, -74.2486];

export const CIENAGA_BOUNDS: [[number, number], [number, number]] = [
  [10.9650, -74.2900],
  [11.0450, -74.2050]
];

export const BARRIOS_CIENAGA: string[] = [
  "Centro Histórico",
  "Barrio Abajo",
  "Miramar",
  "La Floresta",
  "El Carmen",
  "París",
  "Kennedy",
  "Costa Verde",
  "Cordobita",
  "Mar de Plata",
  "San Juan",
  "5 de Febrero",
  "Nancy Polo",
  "Las Delicias",
  "Troncal del Caribe (Paso Urbano)"
];

export const INITIAL_REPORTS: IncidentReport[] = [
  {
    id: "rep-001",
    barrio: "Barrio Abajo",
    direccion: "Calle 13 con Carrera 9",
    tipo: "inundacion",
    severidad: "peligro",
    nivelAgua: "45 cm (Nivel crítico)",
    descripcion: "Agua estancada supera el nivel de los andenes tras lluvias continuas. Imposible el paso para motocicletas y autos bajos. Fuerte corriente hacia la Ciénaga.",
    lat: 11.0035,
    lng: -74.2465,
    fecha: "Hace 20 minutos",
    autor: "Comité Barrial Abajo",
    foto: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80",
    verificado: true
  },
  {
    id: "rep-002",
    barrio: "Centro Histórico",
    direccion: "Calle 9 con Carrera 12 (Cerca al Templete)",
    tipo: "alcantarilla",
    severidad: "peligro",
    nivelAgua: "30 cm",
    descripcion: "Tapa de alcantarilla levantada por la presión del agua pluvial. No se ve a simple vista por la turbidez del agua. Peligro inminente para peatones y motos.",
    lat: 11.0072,
    lng: -74.2515,
    fecha: "Hace 35 minutos",
    autor: "Defensa Civil Ciénaga",
    foto: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    verificado: true
  },
  {
    id: "rep-003",
    barrio: "Miramar",
    direccion: "Calle 1 con Carrera 15 (Sector Playero)",
    tipo: "inundacion",
    severidad: "precaucion",
    nivelAgua: "20 cm (Oleaje y lluvia)",
    descripcion: "Encharcamiento moderado por confluencia de oleaje y lluvia. Paso transitable con lentitud sólo por el carril oriental.",
    lat: 11.0135,
    lng: -74.2505,
    fecha: "Hace 50 minutos",
    autor: "Veeduría Miramar",
    foto: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80",
    verificado: true
  },
  {
    id: "rep-004",
    barrio: "Kennedy",
    direccion: "Calle 28 cerca a la Troncal del Caribe",
    tipo: "hueco",
    severidad: "peligro",
    nivelAgua: "35 cm",
    descripcion: "Socavón profundo de más de 1 metro oculto bajo el agua. Ya se reportó un mototaxista varado. Evitar esta intersección completamente.",
    lat: 10.9925,
    lng: -74.2490,
    fecha: "Hace 1 hora",
    autor: "Conductor Servicio Público",
    foto: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80",
    verificado: true
  },
  {
    id: "rep-005",
    barrio: "La Floresta",
    direccion: "Carrera 21 con Calle 16",
    tipo: "transitable",
    severidad: "transitable",
    nivelAgua: "Seco / 0 cm",
    descripcion: "El canal pluvial recién intervenido funcionó al 100%. Vía totalmente seca y despejada. Recomendada como ruta de alivio hacia el oriente.",
    lat: 10.9995,
    lng: -74.2415,
    fecha: "Hace 15 minutos",
    autor: "Gestión del Riesgo Ciénaga",
    foto: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=600&q=80",
    verificado: true
  },
  {
    id: "rep-006",
    barrio: "Troncal del Caribe (Paso Urbano)",
    direccion: "Calle 24 con Carrera 10",
    tipo: "transitable",
    severidad: "transitable",
    nivelAgua: "Seco",
    descripcion: "Tránsito fluido en ambos sentidos hacia Santa Marta y Barranquilla. Desagües despejados sin empozamientos.",
    lat: 10.9950,
    lng: -74.2450,
    fecha: "Hace 25 minutos",
    autor: "Policía de Tránsito",
    foto: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=600&q=80",
    verificado: true
  },
  {
    id: "rep-007",
    barrio: "El Carmen",
    direccion: "Calle 12 con Carrera 18",
    tipo: "precaucion",
    severidad: "precaucion",
    nivelAgua: "12 cm (Barro y lodo)",
    descripcion: "Agua bajando con arrastre de lodo y ramas. Conduzca con precaución a menos de 20 km/h para evitar derrapes.",
    lat: 11.0085,
    lng: -74.2412,
    fecha: "Hace 45 minutos",
    autor: "Red de Apoyo Ciénaga",
    foto: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=600&q=80",
    verificado: false
  },
  {
    id: "rep-008",
    barrio: "Centro Histórico",
    direccion: "Calle 7 entre Carreras 10 y 14",
    tipo: "transitable",
    severidad: "transitable",
    nivelAgua: "Seco",
    descripcion: "Corredor elevado despejado. Conexión segura hacia la Plaza Centenario y zona bancaria sin obstáculos.",
    lat: 11.0088,
    lng: -74.2530,
    fecha: "Hace 10 minutos",
    autor: "Comerciantes Unidos",
    foto: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80",
    verificado: true
  }
];

export const PRECALCULATED_ROUTES: RouteSuggestion[] = [
  {
    id: "route-1",
    nombre: "Corredor Seguro: Kennedy -> Centro",
    origen: "Kennedy",
    destino: "Centro Histórico",
    distancia: "2.8 km",
    tiempo: "10 min",
    estado: "Recomendada",
    desvio: "Evitar Calle 28 y Barrio Abajo (Calle 13). Tomar Troncal hasta Carrera 21 (La Floresta), subir por Calle 16 y entrar al centro por Calle 7.",
    coords: [
      [10.9910, -74.2480],
      [10.9950, -74.2450],
      [10.9995, -74.2415],
      [11.0050, -74.2430],
      [11.0088, -74.2530]
    ]
  },
  {
    id: "route-2",
    nombre: "Corredor Seguro: Miramar -> La Floresta",
    origen: "Miramar",
    destino: "La Floresta",
    distancia: "3.1 km",
    tiempo: "12 min",
    estado: "Recomendada",
    desvio: "Evitar el borde costero deprimido de Calle 1. Salir por Carrera 18 directamente hacia el sur, evitando cruces deprimidos del Carmen.",
    coords: [
      [11.0135, -74.2505],
      [11.0110, -74.2450],
      [11.0050, -74.2420],
      [10.9995, -74.2415]
    ]
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    entidad: "Cuerpo de Bomberos Voluntarios de Ciénaga",
    linea: "119 / 310 706 9452",
    descripcion: "Atención inmediata de inundaciones graves, rescate de vehículos y personas atrapadas por corriente.",
    color: "border-red-500 bg-red-50/40 dark:bg-red-950/20"
  },
  {
    entidad: "Defensa Civil Colombiana - Seccional Ciénaga",
    linea: "144 / 320 237 8190",
    descripcion: "Evacuación preventiva, apoyo comunitario en barrios críticos y albergues temporales.",
    color: "border-orange-500 bg-orange-50/40 dark:bg-orange-950/20"
  },
  {
    entidad: "Cruz Roja Colombiana - Ciénaga",
    linea: "132",
    descripcion: "Primeros auxilios médicos en terreno, atención de emergencias prehospitalarias.",
    color: "border-rose-500 bg-rose-50/40 dark:bg-rose-950/20"
  },
  {
    entidad: "Policía Nacional - Distrito Ciénaga",
    linea: "123 / (605) 482 1212",
    descripcion: "Seguridad ciudadana y control de tráfico en corredores viales afectados.",
    color: "border-blue-500 bg-blue-50/40 dark:bg-blue-950/20"
  },
  {
    entidad: "Oficina de Gestión del Riesgo y Desastres Ciénaga",
    linea: "(605) 482 0010",
    descripcion: "Coordinación institucional y evaluación oficial de daños en infraestructuras y alcantarillado.",
    color: "border-sky-500 bg-sky-50/40 dark:bg-sky-950/20"
  }
];

