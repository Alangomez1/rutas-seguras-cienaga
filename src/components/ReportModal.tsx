import React, { useState } from 'react';
import { AlertTriangle, MapPin, Crosshair, Camera, Check } from 'lucide-react';
import { IncidentReport, IncidentType, SeverityLevel } from '../types';
import { BARRIOS_CIENAGA, CIENAGA_CENTER } from '../data/mockData';

interface ReportModalProps {
  onAddReport: (report: IncidentReport) => void;
  onCancel: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ onAddReport, onCancel }) => {
  const [barrio, setBarrio] = useState(BARRIOS_CIENAGA[0]);
  const [otroBarrio, setOtroBarrio] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tipo, setTipo] = useState<IncidentType>('inundacion');
  const [severidad, setSeveridad] = useState<SeverityLevel>('peligro');
  const [nivelAgua, setNivelAgua] = useState('30 cm (Moderado)');
  const [descripcion, setDescripcion] = useState('');
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [lat, setLat] = useState(CIENAGA_CENTER[0]);
  const [lng, setLng] = useState(CIENAGA_CENTER[1]);
  const [autor, setAutor] = useState('');
  const [gpsStatus, setGpsStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus('Geolocalización no soportada por el navegador');
      return;
    }
    setGpsStatus('Detectando coordenadas GPS...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(Number(pos.coords.latitude.toFixed(5)));
        setLng(Number(pos.coords.longitude.toFixed(5)));
        setGpsStatus('Coordenadas obtenidas con éxito');
      },
      (err) => {
        setGpsStatus('No se pudo obtener GPS. Usando centro de Ciénaga.');
        console.warn(err);
      },
      { timeout: 8000 }
    );
  };

  const handleBarrioChange = (selected: string) => {
    setBarrio(selected);
    if (selected === 'Barrio Abajo') { setLat(11.0020); setLng(-74.2450); }
    else if (selected === 'Miramar') { setLat(11.0142); setLng(-74.2520); }
    else if (selected === 'Centro Histórico') { setLat(11.0069); setLng(-74.2486); }
    else if (selected === 'La Floresta') { setLat(10.9980); setLng(-74.2420); }
    else if (selected === 'Kennedy') { setLat(10.9910); setLng(-74.2480); }
    else if (selected === 'El Carmen') { setLat(11.0090); setLng(-74.2410); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalBarrio = barrio === 'Otro' ? (otroBarrio || 'Sector Ciénaga') : barrio;

    const newReport: IncidentReport = {
      id: `rep-${Date.now()}`,
      barrio: finalBarrio,
      direccion: direccion || 'Dirección no especificada',
      tipo,
      severidad,
      nivelAgua,
      descripcion: descripcion || 'Reporte generado por ciudadano en Ciénaga.',
      lat,
      lng,
      fecha: 'Hace instantes',
      autor: autor.trim() || 'Ciudadano Vigilante',
      foto: fotoPreview || 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
      verificado: true,
    };

    setTimeout(() => {
      onAddReport(newReport);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
      <div className="flex items-center space-x-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Reportar Calle Inundada o Peligro
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tu reporte alerta a toda la comunidad de Ciénaga y previene accidentes graves.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Barrio o Sector de Ciénaga *
            </label>
            <select
              value={barrio}
              onChange={(e) => handleBarrioChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-2.5 text-xs md:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              required
            >
              {BARRIOS_CIENAGA.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
              <option value="Otro">Otro sector...</option>
            </select>

            {barrio === 'Otro' && (
              <input
                type="text"
                value={otroBarrio}
                onChange={(e) => setOtroBarrio(e.target.value)}
                placeholder="Escribe el nombre del barrio"
                className="mt-2 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-2 text-xs"
                required
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Calle / Carrera / Referencia *
            </label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Ej: Calle 13 entre Carreras 8 y 10"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-2.5 text-xs md:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Tipo de Incidente *
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as IncidentType)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-2.5 text-xs md:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            >
              <option value="inundacion">Calle Inundada / Desbordada</option>
              <option value="alcantarilla">Alcantarilla Sin Tapa</option>
              <option value="hueco">Socavón / Hueco Peligroso</option>
              <option value="transitable">Vía Despejada / Transitable</option>
              <option value="arbol">Árbol o Poste Caído</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Nivel de Peligro (Color) *
            </label>
            <select
              value={severidad}
              onChange={(e) => setSeveridad(e.target.value as SeverityLevel)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-2.5 text-xs md:text-sm focus:ring-2 focus:ring-sky-500 outline-none font-semibold"
            >
              <option value="peligro" className="text-red-600">🔴 Peligro Crítico (Rojo)</option>
              <option value="precaucion" className="text-amber-500">🟡 Precaución / Lodo (Amarillo)</option>
              <option value="transitable" className="text-emerald-600">🟢 Transitable / Seguro (Verde)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Nivel Estimado de Agua
            </label>
            <select
              value={nivelAgua}
              onChange={(e) => setNivelAgua(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-2.5 text-xs md:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            >
              <option value="Seco / 0 cm">Seco / Desagüe normal</option>
              <option value="10 - 20 cm (Encharcado)">10 - 20 cm (Encharcado)</option>
              <option value="30 cm (Moderado)">30 cm (Cubre aceras)</option>
              <option value="> 45 cm (Crítico)">Mayor a 45 cm (Imposible cruzar)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
            Descripción Detallada del Estado *
          </label>
          <textarea
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Indica si hay corriente fuerte, si motocicletas se han caído, etc."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl p-3 text-xs md:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            required
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-sky-600" />
              Geolocalización en Ciénaga
            </span>
            <button
              type="button"
              onClick={handleGetLocation}
              className="text-xs px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold flex items-center transition-colors"
            >
              <Crosshair className="w-3.5 h-3.5 mr-1.5" />
              Tomar mi GPS
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Latitud:</span>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(parseFloat(e.target.value))}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Longitud:</span>
              <input
                type="number"
                step="0.0001"
                value={lng}
                onChange={(e) => setLng(parseFloat(e.target.value))}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono"
              />
            </div>
          </div>

          {gpsStatus && (
            <p className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">{gpsStatus}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Evidencia Fotográfica (Opcional)
            </label>
            <div className="flex items-center space-x-3">
              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center">
                <Camera className="w-4 h-4 mr-2 text-sky-600" />
                Adjuntar Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              {fotoPreview && (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200">
                  <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Tu Nombre o Identificador (Opcional)
            </label>
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              placeholder="Ej: Vecino Barrio Abajo / Veedor"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-2.5 text-xs md:text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs md:text-sm font-semibold transition-colors"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs md:text-sm shadow-lg shadow-red-600/30 flex items-center space-x-2 transition-transform active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>{isSubmitting ? 'Publicando reporte...' : 'Guardar y Publicar en Mapa'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

