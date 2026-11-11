import React from 'react';
import { 
  ClipboardList, 
  Waves, 
  AlertOctagon, 
  ShieldCheck, 
  PieChart, 
  Activity, 
  Route, 
  Crosshair, 
  ChevronRight, 
  Navigation, 
  MessageSquare, 
  Info, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { IncidentReport, NavView } from '../types';
import { PRECALCULATED_ROUTES } from '../data/mockData';

interface DashboardProps {
  reports: IncidentReport[];
  totalReportes: number;
  callesInundadas: number;
  zonasPeligrosas: number;
  zonasPrecaucion: number;
  viasTransitables: number;
  onNavigate: (view: NavView) => void;
  onSelectReport: (report: IncidentReport) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  reports,
  totalReportes,
  callesInundadas,
  zonasPeligrosas,
  zonasPrecaucion,
  viasTransitables,
  onNavigate,
  onSelectReport,
}) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Banner de Bienvenida y Propósito */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b1f3a] via-[#103056] to-[#0284c7] text-white p-6 md:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-sky-100 border border-white/20">
            Sistema de Alerta Temprana e Inteligencia Ciudadana
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Protegiendo a la comunidad de Ciénaga durante las lluvias
          </h2>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed">
            Visualiza calles anegadas, identifica alcantarillas destapadas o huecos peligrosos y consulta a 
            nuestro Asistente de IA para encontrar las rutas más seguras de tránsito hacia tu destino.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('mapa')}
              className="bg-white hover:bg-slate-100 text-[#0b1f3a] font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all flex items-center space-x-2"
            >
              <Navigation className="w-4 h-4 text-sky-600" />
              <span>Explorar Mapa de Riesgos</span>
            </button>
            <button
              onClick={() => onNavigate('asistente')}
              className="bg-sky-500/30 hover:bg-sky-500/50 text-white border border-sky-300/40 font-semibold px-5 py-2.5 rounded-xl text-sm backdrop-blur-md transition-all flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 text-sky-200" />
              <span>Preguntar a Rutas Seguras IA</span>
            </button>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Tarjetas de Métricas Principales (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Reportes</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{totalReportes}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ClipboardList className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-500 dark:text-slate-400">
            <span className="text-blue-600 font-bold mr-1">100%</span> verificados comunitariamente
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Calles Inundadas</p>
              <h3 className="text-3xl font-extrabold text-red-600 mt-1">{callesInundadas}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
              <Waves className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-red-600 font-medium">
            Represamiento en Barrio Abajo y Centro
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Zonas Peligro Alto</p>
              <h3 className="text-3xl font-extrabold text-amber-500 mt-1">{zonasPeligrosas}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
              <AlertOctagon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-amber-600 dark:text-amber-400 font-medium">
            Alcantarillas sin tapa y socavones
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Vías Transitables</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">{viasTransitables}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
            Corredores seguros habilitados
          </div>
        </div>
      </div>

      {/* Gráficos y Distribución */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm lg:col-span-1">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-sky-600" />
            Distribución de Severidad
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center text-red-600">
                  <span className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                  Peligro Crítico (Rojo)
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  {zonasPeligrosas} ({Math.round((zonasPeligrosas / totalReportes) * 100 || 0)}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-red-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${(zonasPeligrosas / totalReportes) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center text-amber-500">
                  <span className="w-3 h-3 rounded-full bg-amber-500 mr-2" />
                  Precaución (Amarillo)
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  {zonasPrecaucion} ({Math.round((zonasPrecaucion / totalReportes) * 100 || 0)}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${(zonasPrecaucion / totalReportes) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center text-emerald-600">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
                  Vías Transitables (Verde)
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  {viasTransitables} ({Math.round((viasTransitables / totalReportes) * 100 || 0)}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${(viasTransitables / totalReportes) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200">
            <p className="font-bold mb-1 flex items-center">
              <Info className="w-4 h-4 mr-1.5 text-blue-600" />
              Recomendación para Motociclistas y Peatones
            </p>
            <p className="text-blue-800/80 dark:text-blue-300/80 leading-relaxed">
              Evite circular por la Calle 13 (Barrio Abajo) y Carrera 12 (Centro). Las tapas de alcantarilla sin fijación son trampas de alto riesgo invisibles bajo el agua.
            </p>
          </div>
        </div>

        {/* Lista Reciente de Reportes */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-sky-600" />
              Últimos Incidentes Reportados en Ciénaga
            </h3>
            <button
              onClick={() => onNavigate('mapa')}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center"
            >
              Ver todos en mapa
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {reports.slice(0, 4).map((item) => (
              <div key={item.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 ${
                    item.severidad === 'peligro' ? 'bg-red-500 ring-4 ring-red-100 dark:ring-red-950' :
                    item.severidad === 'precaucion' ? 'bg-amber-500 ring-4 ring-amber-100 dark:ring-amber-950' :
                    'bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950'
                  }`} />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {item.barrio}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        &bull; {item.direccion}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-1">
                      {item.descripcion}
                    </p>
                    <div className="flex items-center space-x-3 mt-1.5 text-[11px] text-slate-400">
                      <span>{item.fecha}</span>
                      <span>&bull;</span>
                      <span className="font-semibold text-slate-500 dark:text-slate-400">{item.nivelAgua}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectReport(item)}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-700 dark:bg-slate-800 dark:hover:bg-sky-950 dark:text-slate-300 dark:hover:text-sky-300 font-medium transition-colors flex items-center"
                >
                  <Crosshair className="w-3.5 h-3.5 mr-1" />
                  Ubicar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corredores viales sugeridos */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center">
          <Route className="w-5 h-5 mr-2 text-emerald-600" />
          Corredores Viales Sugeridos Hoy en Ciénaga
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Trazados optimizados para evitar los puntos críticos de represamiento pluvial
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRECALCULATED_ROUTES.map((route) => (
            <div key={route.id} className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                  {route.nombre}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/60 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                  {route.tiempo} &bull; {route.distancia}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {route.desvio}
              </p>
              <button
                onClick={() => onNavigate('mapa')}
                className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 flex items-center"
              >
                Ver trazado en el mapa
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

