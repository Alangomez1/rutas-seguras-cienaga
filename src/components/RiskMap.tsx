import React, { useState, useEffect, useRef } from 'react';
import { Compass, Plus, Layers, Navigation2, RefreshCw, Play, Square, Map as MapIcon } from 'lucide-react';
import { IncidentReport, SeverityLevel, DynamicRealTimeRoute } from '../types';
import { CIENAGA_CENTER, CIENAGA_BOUNDS, BARRIOS_CIENAGA } from '../data/mockData';

declare const L: any;

const BARRIOS_DATA: Record<string, [number, number]> = {
  "Centro Histórico": [11.0069, -74.2486],
  "Barrio Abajo": [11.0035, -74.2465],
  "Miramar": [11.0135, -74.2505],
  "La Floresta": [10.9995, -74.2415],
  "El Carmen": [11.0085, -74.2412],
  "París": [11.0040, -74.2380],
  "Kennedy": [10.9910, -74.2480],
  "Costa Verde": [11.0180, -74.2610],
  "Cordobita": [10.9850, -74.2400],
  "Mar de Plata": [11.0150, -74.2560],
  "San Juan": [11.0010, -74.2520],
  "5 de Febrero": [10.9930, -74.2420],
  "Troncal del Caribe (Paso Urbano)": [10.9950, -74.2450]
};

function generateDynamicRoute(origenBarrio: string, destinoBarrio: string): DynamicRealTimeRoute {
  const origCoord = BARRIOS_DATA[origenBarrio] || [10.9910, -74.2480];
  const destCoord = BARRIOS_DATA[destinoBarrio] || [11.0088, -74.2530];

  const waypointSeguro: [number, number] = [10.9995, -74.2415];
  const waypointCentroSeguro: [number, number] = [11.0070, -74.2450];

  const safePoints: [number, number][] = [
    origCoord,
    [origCoord[0] + 0.003, origCoord[1] + 0.003],
    waypointSeguro,
    waypointCentroSeguro,
    destCoord
  ];

  const dangerPoints: [number, number][] = [
    origCoord,
    [10.9925, -74.2490],
    [11.0035, -74.2465],
    [11.0072, -74.2515],
    destCoord
  ];

  return {
    id: `dyn-route-${Date.now()}`,
    origen: origenBarrio,
    destino: destinoBarrio,
    distancia: "3.2 km",
    tiempoEstimado: "9 minutos",
    safePoints,
    dangerPoints,
    peligrosEvitados: [
      "Calle 13 Barrio Abajo (Inundación 45 cm)",
      "Calle 9 Cra 12 Centro (Alcantarilla sin tapa)",
      "Calle 28 Kennedy (Socavón profundo)"
    ],
    maniobras: [
      `Salida desde ${origenBarrio} hacia la calzada principal.`,
      "Desvío programado hacia Carrera 21 en La Floresta (canal funcionando).",
      "Evadir cruce deprimido de Calle 13 por Calle 16.",
      `Ingreso seguro y despejado al sector de ${destinoBarrio}.`
    ]
  };
}

interface RiskMapProps {
  reports: IncidentReport[];
  filterSeveridad: SeverityLevel | 'todos';
  setFilterSeveridad: (s: SeverityLevel | 'todos') => void;
  filterBarrio: string;
  setFilterBarrio: (b: string) => void;
  selectedReportOnMap: IncidentReport | null;
  setSelectedReportOnMap: (r: IncidentReport | null) => void;
  onOpenReportForm: () => void;
  currentSkin?: string;
}

export const RiskMap: React.FC<RiskMapProps> = ({
  reports,
  filterSeveridad,
  setFilterSeveridad,
  filterBarrio,
  setFilterBarrio,
  selectedReportOnMap,
  setSelectedReportOnMap,
  onOpenReportForm,
  currentSkin = 'radar',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const routeLayerGroupRef = useRef<any>(null);
  const liveVehicleMarkerRef = useRef<any>(null);
  const animationTimerRef = useRef<any>(null);

  const [origen, setOrigen] = useState<string>("Kennedy");
  const [destino, setDestino] = useState<string>("Centro Histórico");
  const [activeRoute, setActiveRoute] = useState<DynamicRealTimeRoute | null>(null);
  const [isSimulatingGPS, setIsSimulatingGPS] = useState<boolean>(false);
  const [simProgress, setSimProgress] = useState<number>(0);
  const [currentSpeed, setCurrentSpeed] = useState<number>(24);

  const filteredReports = reports.filter((r) => {
    const matchSeveridad = filterSeveridad === 'todos' || r.severidad === filterSeveridad;
    const matchBarrio = filterBarrio === 'todos' || r.barrio === filterBarrio;
    return matchSeveridad && matchBarrio;
  });

  const calculateAndDrawRoute = (orig: string, dest: string) => {
    if (!mapInstanceRef.current || !routeLayerGroupRef.current || typeof L === 'undefined') return;

    const route = generateDynamicRoute(orig, dest);
    setActiveRoute(route);

    const routeGroup = routeLayerGroupRef.current;
    routeGroup.clearLayers();

    const dangerPolyline = L.polyline(route.dangerPoints, {
      color: '#ef4444',
      weight: 4,
      opacity: 0.7,
      dashArray: '6, 10'
    }).addTo(routeGroup);

    dangerPolyline.bindPopup(`
      <div style="font-family: sans-serif; font-size: 12px; padding: 6px;">
        <strong style="color: #ef4444; display: block; margin-bottom: 2px;">⚠️ Ruta Directa Bloqueada</strong>
        <p style="color: #64748b;">Evita este paso: cruza por Calle 13 y Calle 28 con inundaciones severas.</p>
      </div>
    `);

    const safePolyline = L.polyline(route.safePoints, {
      color: '#10b981',
      weight: 6,
      opacity: 0.95,
      lineJoin: 'round'
    }).addTo(routeGroup);

    safePolyline.bindPopup(`
      <div style="font-family: sans-serif; font-size: 12px; padding: 6px;">
        <strong style="color: #059669; display: block; margin-bottom: 2px;">✅ Corredor Seguro Recomendado</strong>
        <p style="color: #334155;">Vía despejada sin puntos críticos. Distancia: ${route.distancia}.</p>
      </div>
    `);

    mapInstanceRef.current.fitBounds(safePolyline.getBounds(), { padding: [40, 40] });
    stopGPSSimulation();
  };

  const startGPSSimulation = () => {
    if (!activeRoute || !mapInstanceRef.current || typeof L === 'undefined') return;

    setIsSimulatingGPS(true);
    setSimProgress(0);

    const points = activeRoute.safePoints;
    let step = 0;
    const totalSteps = 60;

    if (!liveVehicleMarkerRef.current) {
      const vehicleIcon = L.divIcon({
        className: 'live-vehicle-marker-icon',
        html: `
          <div style="width: 38px; height: 38px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border: 3px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; box-shadow: 0 0 15px #10b981;">
            🚗
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });

      liveVehicleMarkerRef.current = L.marker(points[0], { icon: vehicleIcon }).addTo(mapInstanceRef.current);
    }

    if (animationTimerRef.current) clearInterval(animationTimerRef.current);

    animationTimerRef.current = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      setSimProgress(Math.min(100, Math.round(progress * 100)));

      const totalSegments = points.length - 1;
      const currentSegIndex = Math.min(Math.floor(progress * totalSegments), totalSegments - 1);
      const segProgress = (progress * totalSegments) - currentSegIndex;

      const p1 = points[currentSegIndex];
      const p2 = points[currentSegIndex + 1];

      if (p1 && p2) {
        const currentLat = p1[0] + (p2[0] - p1[0]) * segProgress;
        const currentLng = p1[1] + (p2[1] - p1[1]) * segProgress;

        liveVehicleMarkerRef.current.setLatLng([currentLat, currentLng]);

        if (step % 5 === 0) {
          mapInstanceRef.current.panTo([currentLat, currentLng], { animate: true });
        }
      }

      setCurrentSpeed(Math.round(22 + Math.sin(step) * 6));

      if (step >= totalSteps) {
        clearInterval(animationTimerRef.current);
        setIsSimulatingGPS(false);
      }
    }, 400);
  };

  const stopGPSSimulation = () => {
    if (animationTimerRef.current) clearInterval(animationTimerRef.current);
    setIsSimulatingGPS(false);
    setSimProgress(0);
    if (liveVehicleMarkerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(liveVehicleMarkerRef.current);
      liveVehicleMarkerRef.current = null;
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (typeof L === 'undefined') return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: CIENAGA_CENTER,
        zoom: 14,
        minZoom: 12,
        maxZoom: 18,
        maxBounds: CIENAGA_BOUNDS
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | Rutas Seguras Ciénaga RT',
        maxZoom: 19
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      const routeGroup = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
      markersGroupRef.current = markersGroup;
      routeLayerGroupRef.current = routeGroup;

      L.circle(CIENAGA_CENTER, {
        radius: 2800,
        color: '#10b981',
        fillColor: '#0ea5e9',
        fillOpacity: 0.12,
        weight: 1,
        dashArray: '4, 8'
      }).addTo(map);

      calculateAndDrawRoute("Kennedy", "Centro Histórico");
    }

    return () => {
      if (animationTimerRef.current) clearInterval(animationTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current || typeof L === 'undefined') return;

    const markersGroup = markersGroupRef.current;
    markersGroup.clearLayers();

    filteredReports.forEach((rep) => {
      let bgColor = '#10b981';
      let iconHtml = '🛡️';
      let pulseClass = '';

      if (rep.severidad === 'peligro') {
        bgColor = '#ef4444';
        iconHtml = '⚠️';
        pulseClass = 'pulse-danger';
      } else if (rep.severidad === 'precaucion') {
        bgColor = '#f59e0b';
        iconHtml = '⚡';
      }

      const customIcon = L.divIcon({
        className: 'custom-leaflet-div-icon',
        html: `
          <div class="custom-map-marker ${pulseClass}" style="background-color: ${bgColor}; width: 34px; height: 34px; font-size: 15px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
            ${iconHtml}
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18]
      });

      const marker = L.marker([rep.lat, rep.lng], { icon: customIcon });

      const popupContent = `
        <div style="font-family: sans-serif; width: 250px; font-size: 12px; line-height: 1.4; border-radius: 12px; overflow: hidden;">
          ${rep.foto ? `
            <div style="width: 100%; height: 110px; background: #e2e8f0; overflow: hidden; position: relative;">
              <img src="${rep.foto}" alt="${rep.barrio}" style="width: 100%; height: 100%; object-fit: cover;" />
              <span style="position: absolute; top: 6px; left: 6px; background-color: ${bgColor}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">
                ${rep.severidad.toUpperCase()}
              </span>
            </div>
          ` : ''}
          <div style="padding: 12px;">
            <strong style="font-size: 14px; color: #0f172a; display: block;">${rep.barrio}</strong>
            <span style="font-size: 11px; color: #64748b;">${rep.direccion}</span>
            <div style="margin-top: 8px; background: #f8fafc; padding: 6px; border-radius: 6px; border: 1px solid #e2e8f0;">
              <div><strong>Nivel Agua:</strong> ${rep.nivelAgua || 'No especificado'}</div>
              <div><strong>Tipo:</strong> ${rep.tipo}</div>
            </div>
            <p style="margin-top: 8px; color: #334155; font-size: 11px;">${rep.descripcion}</p>
            <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between;">
              <span>${rep.fecha}</span>
              <span>${rep.autor}</span>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.addTo(markersGroup);

      if (selectedReportOnMap && selectedReportOnMap.id === rep.id) {
        mapInstanceRef.current.setView([rep.lat, rep.lng], 16, { animate: true });
        marker.openPopup();
      }
    });
  }, [filteredReports, selectedReportOnMap]);

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(CIENAGA_CENTER, 14, { animate: true });
      setSelectedReportOnMap(null);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] space-y-3">
      {/* PANEL DE CONTROL DE RUTAS */}
      <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center">
              <Navigation2 className="w-4 h-4 mr-1 text-emerald-500" />
              Ruta en Vivo:
            </span>

            <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-xl">
              <span className="text-slate-400 text-[11px]">Desde:</span>
              <select
                value={origen}
                onChange={(e) => {
                  setOrigen(e.target.value);
                  calculateAndDrawRoute(e.target.value, destino);
                }}
                className="bg-transparent font-bold text-slate-800 dark:text-slate-100 outline-none"
              >
                {BARRIOS_CIENAGA.map(b => (
                  <option key={b} value={b} className="bg-slate-900 text-white">{b}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-xl">
              <span className="text-slate-400 text-[11px]">Hasta:</span>
              <select
                value={destino}
                onChange={(e) => {
                  setDestino(e.target.value);
                  calculateAndDrawRoute(origen, e.target.value);
                }}
                className="bg-transparent font-bold text-slate-800 dark:text-slate-100 outline-none"
              >
                {BARRIOS_CIENAGA.map(b => (
                  <option key={b} value={b} className="bg-slate-900 text-white">{b}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => calculateAndDrawRoute(origen, destino)}
              className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded-xl font-bold transition-all shadow-xs flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Recalcular</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {!isSimulatingGPS ? (
              <button
                onClick={startGPSSimulation}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-600/30 transition-transform active:scale-95 animate-pulse"
              >
                <Play className="w-4 h-4" />
                <span>Simular Recorrido GPS</span>
              </button>
            ) : (
              <button
                onClick={stopGPSSimulation}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-red-600/30 transition-transform active:scale-95"
              >
                <Square className="w-4 h-4" />
                <span>Detener GPS ({simProgress}%)</span>
              </button>
            )}

            <button
              onClick={resetView}
              title="Centrar en Ciénaga"
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <Compass className="w-4 h-4" />
            </button>
          </div>
        </div>

        {activeRoute && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs gap-3">
            <div className="flex items-center space-x-4">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5 animate-ping" />
                Corredor Seguro: {activeRoute.distancia} ({activeRoute.tiempoEstimado})
              </span>
              <span className="text-red-500 font-medium hidden md:inline">
                Puntos críticos evitados: {activeRoute.peligrosEvitados.length}
              </span>
            </div>

            {isSimulatingGPS && (
              <div className="flex items-center space-x-3 font-mono text-[11px] bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                <span className="text-emerald-400 font-bold">VEL: {currentSpeed} km/h</span>
                <span className="text-sky-400">PROGRESO: {simProgress}%</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MAPA */}
      <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg relative map-container-wrapper">
        <div ref={mapContainerRef} className="w-full h-full min-h-[420px]" />

        {activeRoute && (
          <div className="absolute top-4 left-4 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-xs text-xs pointer-events-auto">
            <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center mb-1.5 text-xs">
              <MapIcon className="w-4 h-4 mr-1 text-emerald-500" />
              Guía de Maniobras Seguras
            </div>
            <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
              {activeRoute.maniobras.map((m, idx) => (
                <div key={idx} className="flex items-start space-x-1.5">
                  <span className="font-bold text-emerald-500">{idx + 1}.</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg text-xs space-y-1.5 pointer-events-auto max-w-[250px]">
          <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center text-xs">
            <Layers className="w-3.5 h-3.5 mr-1 text-emerald-500" />
            Capas en Tiempo Real
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center space-x-2">
              <span className="w-4 h-1 bg-emerald-500 rounded" />
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">Ruta Segura Activa</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-1 border-b-2 border-dashed border-red-500" />
              <span className="text-red-500 font-semibold">Vía Bloqueada / Inundada</span>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 z-[1000] bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 shadow-md text-[11px] font-mono flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>GPS: 11.0069° N, -74.2486° W &bull; RT OK</span>
        </div>
      </div>
    </div>
  );
};
