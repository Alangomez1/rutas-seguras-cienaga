import React from 'react';
import { 
  ShieldAlert, 
  Radio,
  LayoutDashboard, 
  MapPin, 
  Bot, 
  PlusCircle, 
  PhoneCall, 
  Palette, 
  X,
  Radar
} from 'lucide-react';
import { NavView, SkinTheme } from '../types';

interface SidebarProps {
  currentView: NavView;
  setCurrentView: (view: NavView) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  currentSkin: SkinTheme;
  setCurrentSkin: (skin: SkinTheme) => void;
  totalReports: number;
  dangerZones: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  mobileMenuOpen,
  setMobileMenuOpen,
  currentSkin,
  setCurrentSkin,
  totalReports,
  dangerZones,
}) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#091b33] text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:static md:w-72 md:shrink-0`}
    >
      {/* Header del Sidebar */}
      <div className="p-5 border-b border-slate-800/80 bg-[#071528] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-sky-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wide text-white leading-tight">
              RUTAS SEGURAS
            </h1>
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-1.5 animate-ping" />
              Ciénaga en Tiempo Real
            </span>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Alerta de GPS & Radar Activo */}
      <div className="mx-4 my-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center space-x-3 text-emerald-200">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
          <Radar className="w-5 h-5 animate-spin" />
        </div>
        <div className="text-xs leading-snug">
          <div className="font-bold text-emerald-100 flex items-center">
            <span>GPS & Radar Activo</span>
            <span className="ml-1.5 text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded">En vivo</span>
          </div>
          <span className="text-emerald-300/80">Monitoreo satelital y pluvial</span>
        </div>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
          Navegación del Sistema
        </div>

        <button
          onClick={() => { setCurrentView('inicio'); setMobileMenuOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
            currentView === 'inicio'
              ? 'bg-gradient-to-r from-emerald-600 to-sky-700 text-white shadow-lg shadow-emerald-900/40 font-semibold'
              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Inicio & Métricas</span>
          {dangerZones > 0 && (
            <span className="ml-auto bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {dangerZones}
            </span>
          )}
        </button>

        <button
          onClick={() => { setCurrentView('mapa'); setMobileMenuOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
            currentView === 'mapa'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-900/40 font-semibold'
              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <MapPin className="w-5 h-5 text-emerald-400" />
          <span>Mapa & Rutas en Vivo</span>
          <span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-mono font-bold">
            EN VIVO
          </span>
        </button>

        <button
          onClick={() => { setCurrentView('asistente'); setMobileMenuOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
            currentView === 'asistente'
              ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-lg shadow-sky-900/40 font-semibold'
              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <Bot className="w-5 h-5 text-sky-400" />
          <span>Consultar IA</span>
          <span className="ml-auto bg-sky-500/20 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            Asistente
          </span>
        </button>

        <button
          onClick={() => { setCurrentView('reportar'); setMobileMenuOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
            currentView === 'reportar'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-900/40 font-semibold'
              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <PlusCircle className="w-5 h-5 text-amber-400" />
          <span>Reportar Incidente</span>
          <span className="ml-auto text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
            + Nuevo
          </span>
        </button>

        <div className="pt-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
            Asistencia y Apoyo
          </div>
          <button
            onClick={() => { setCurrentView('emergencias'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
              currentView === 'emergencias'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
            }`}
          >
            <PhoneCall className="w-5 h-5 text-emerald-400" />
            <span>Líneas de Emergencia</span>
          </button>
        </div>
      </nav>

      {/* SELECTOR DE SKINS / TEMAS CON LA NUEVA SKIN "RADAR VIVO" */}
      <div className="p-4 mx-4 mb-4 rounded-2xl bg-[#061222] border border-slate-800 text-xs">
        <div className="flex items-center justify-between mb-2 text-slate-300">
          <span className="font-semibold flex items-center">
            <Palette className="w-4 h-4 mr-1.5 text-emerald-400" />
            Skins & Visualización
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900/90 rounded-xl text-[11px]">
          <button
            onClick={() => setCurrentSkin('radar')}
            title="Skin Radar en Tiempo Real & Cockpit Satelital"
            className={`py-1.5 px-2 rounded-lg text-center font-bold transition-all flex items-center justify-center space-x-1 ${
              currentSkin === 'radar'
                ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                : 'text-emerald-400 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Radar Vivo</span>
          </button>

          <button
            onClick={() => setCurrentSkin('institucional')}
            title="Skin Institucional Alcaldía / Oficial"
            className={`py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
              currentSkin === 'institucional'
                ? 'bg-sky-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Oficial
          </button>

          <button
            onClick={() => setCurrentSkin('nocturno')}
            title="Skin Tormenta Nocturna / Dark Mode"
            className={`py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
              currentSkin === 'nocturno'
                ? 'bg-slate-700 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Noche
          </button>

          <button
            onClick={() => setCurrentSkin('emergencia')}
            title="Skin Alerta Máxima de Rescate"
            className={`py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
              currentSkin === 'emergencia'
                ? 'bg-red-700 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Alerta
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800/80 text-[11px] text-slate-400 bg-[#050f1d] flex items-center justify-between">
        <div>
          <p className="font-semibold text-slate-300">Ciénaga Resiliente 2026</p>
          <p className="text-slate-500">Mapeo Satelital & GPS Activo</p>
        </div>
        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md font-mono text-[10px]">
          v3.0 RT
        </span>
      </div>
    </aside>
  );
};
