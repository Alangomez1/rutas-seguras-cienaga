import React from 'react';
import { PhoneForwarded, ShieldCheck } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/mockData';

export const EmergencyDirectory: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center">
          <PhoneForwarded className="w-6 h-6 mr-2 text-red-600" />
          Líneas Directas de Emergencia en Ciénaga, Magdalena
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          En caso de peligro inminente para la vida o desborde mayor de aguas pluviales, comunícate de inmediato con las entidades de socorro.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EMERGENCY_CONTACTS.map((c, i) => (
            <div key={i} className={`p-5 rounded-2xl border-l-4 ${c.color} border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2`}>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{c.entidad}</h3>
              <div className="text-base font-extrabold text-sky-700 dark:text-sky-300 font-mono">
                📞 {c.linea}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {c.descripcion}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center">
            <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600" />
            Recomendaciones Clave para Ciudadanos de Ciénaga
          </h3>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
            <li>No arrojar basuras a las calles ni a los canales de drenaje; es la causa principal de los taponamientos en Barrio Abajo y Centro.</li>
            <li>Nunca intentes cruzar en moto una corriente de agua que supere la altura del eje de la llanta.</li>
            <li>Mantén desconectados los electrodomésticos si el nivel de agua ingresa a tu vivienda.</li>
            <li>Informa inmediatamente cualquier alcantarilla sin tapa en esta plataforma para salvaguardar a tus vecinos.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

