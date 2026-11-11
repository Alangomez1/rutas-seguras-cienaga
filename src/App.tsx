import React, { useState, useEffect } from 'react';
import { Menu, AlertTriangle, Sparkles } from 'lucide-react';
import { NavView, SkinTheme, IncidentReport, SeverityLevel } from './types';
import { INITIAL_REPORTS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { RiskMap } from './components/RiskMap';
import { AiAssistant } from './components/AiAssistant';
import { ReportModal } from './components/ReportModal';
import { EmergencyDirectory } from './components/EmergencyDirectory';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavView>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentSkin, setCurrentSkin] = useState<SkinTheme>('radar');

  const [reports, setReports] = useState<IncidentReport[]>(() => {
    try {
      const saved = localStorage.getItem('rutas_seguras_cienaga_reports');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading localStorage', e);
    }
    return INITIAL_REPORTS;
  });

  const [filterSeveridad, setFilterSeveridad] = useState<SeverityLevel | 'todos'>('todos');
  const [filterBarrio, setFilterBarrio] = useState<string>('todos');
  const [selectedReportOnMap, setSelectedReportOnMap] = useState<IncidentReport | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('rutas_seguras_cienaga_reports', JSON.stringify(reports));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [reports]);

  useEffect(() => {
    let classes = `skin-${currentSkin} transition-colors duration-300 `;
    if (currentSkin === 'radar') {
      classes += 'dark bg-[#020617] text-slate-100';
    } else if (currentSkin === 'nocturno') {
      classes += 'dark bg-slate-950 text-slate-100';
    } else if (currentSkin === 'emergencia') {
      classes += 'bg-gray-900 text-white';
    } else {
      classes += 'bg-slate-50 text-slate-800';
    }
    document.body.className = classes;
  }, [currentSkin]);

  const handleAddReport = (newReport: IncidentReport) => {
    const updated = [newReport, ...reports];
    setReports(updated);
    setCurrentView('mapa');
    setSelectedReportOnMap(newReport);
  };

  const totalReportes = reports.length;
  const callesInundadas = reports.filter((r) => r.tipo === 'inundacion').length;
  const zonasPeligrosas = reports.filter((r) => r.severidad === 'peligro').length;
  const zonasPrecaucion = reports.filter((r) => r.severidad === 'precaucion').length;
  const viasTransitables = reports.filter((r) => r.severidad === 'transitable').length;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        currentSkin={currentSkin}
        setCurrentSkin={setCurrentSkin}
        totalReports={totalReportes}
        dangerZones={zonasPeligrosas}
      />

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                {currentView === 'inicio' && 'Panel de Control y Métricas Ciudadanas'}
                {currentView === 'mapa' && 'Mapa Comunitario de Riesgos e Inundaciones'}
                {currentView === 'asistente' && 'Rutas Seguras IA - Asistente de Movilidad'}
                {currentView === 'reportar' && 'Nuevo Reporte Ciudadano de Incidente'}
                {currentView === 'emergencias' && 'Directorio de Emergencias de Ciénaga'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Municipio de Ciénaga, Magdalena &bull; Red en tiempo real de monitoreo pluvial
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentView('reportar')}
              className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold flex items-center space-x-1.5 shadow-md shadow-red-600/25 transition-transform active:scale-95"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Reportar Peligro</span>
              <span className="sm:hidden">Reportar</span>
            </button>

            <button
              onClick={() => setCurrentView('asistente')}
              className="bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold flex items-center space-x-1.5 shadow-md shadow-sky-600/25 transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span className="hidden sm:inline">Consultar IA</span>
              <span className="sm:hidden">IA</span>
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          {currentView === 'inicio' && (
            <Dashboard
              reports={reports}
              totalReportes={totalReportes}
              callesInundadas={callesInundadas}
              zonasPeligrosas={zonasPeligrosas}
              zonasPrecaucion={zonasPrecaucion}
              viasTransitables={viasTransitables}
              onNavigate={setCurrentView}
              onSelectReport={(rep) => {
                setSelectedReportOnMap(rep);
                setCurrentView('mapa');
              }}
            />
          )}

          {currentView === 'mapa' && (
            <RiskMap
              reports={reports}
              filterSeveridad={filterSeveridad}
              setFilterSeveridad={setFilterSeveridad}
              filterBarrio={filterBarrio}
              setFilterBarrio={setFilterBarrio}
              selectedReportOnMap={selectedReportOnMap}
              setSelectedReportOnMap={setSelectedReportOnMap}
              onOpenReportForm={() => setCurrentView('reportar')}
              currentSkin={currentSkin}
            />
          )}

          {currentView === 'asistente' && (
            <AiAssistant
              reports={reports}
              onNavigateToMap={(barrio) => {
                setFilterBarrio(barrio || 'todos');
                setCurrentView('mapa');
              }}
            />
          )}

          {currentView === 'reportar' && (
            <ReportModal
              onAddReport={handleAddReport}
              onCancel={() => setCurrentView('mapa')}
            />
          )}

          {currentView === 'emergencias' && (
            <EmergencyDirectory />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;

