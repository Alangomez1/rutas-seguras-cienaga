import { IncidentReport } from '../types';
import { BARRIOS_CIENAGA } from '../data/mockData';

export interface AIResponse {
  reply: string;
  matchedBarrio: string | null;
}

/**
 * Motor de Inteligencia Artificial Local Simulado
 * Analiza en tiempo real los incidentes reportados en Ciénaga, Magdalena
 * y genera recomendaciones de movilidad segura con advertencias de prevención.
 */
export function processAIQuery(queryText: string, reports: IncidentReport[]): AIResponse {
  const query = queryText.toLowerCase().trim();

  // Peligros activos y filtros
  const peligros = reports.filter(r => r.severidad === 'peligro');
  const transitables = reports.filter(r => r.severidad === 'transitable');
  const alcantarillas = reports.filter(
    r => r.tipo === 'alcantarilla' || r.descripcion.toLowerCase().includes('alcantarilla')
  );

  let reply = '';
  let matchedBarrio: string | null = null;

  // 1. Ruta Kennedy -> Centro
  if (query.includes('kennedy') && query.includes('centro')) {
    reply = `📍 **Recomendación de Ruta: Kennedy ➡️ Centro Histórico**\n\n` +
      `⚠️ **Puntos Críticos a Evitar:**\n` +
      `- Evita la **Calle 28 cerca de la Troncal** (se reporta un socavón de 1m oculto bajo 35cm de agua).\n` +
      `- No entres por la **Calle 13 en Barrio Abajo**, ya que presenta un nivel crítico de 45cm de agua estancada.\n\n` +
      `✅ **Ruta Alternativa Segura:**\n` +
      `1. Toma la calzada de la **Troncal del Caribe** hacia el norte (actualmente transitable).\n` +
      `2. Ingresa por la **Carrera 21 hacia La Floresta** (el canal pluvial está drenando eficazmente).\n` +
      `3. Sube por la **Calle 16** y accede al Centro Histórico por la **Calle 7**, la cual tiene pendiente favorable y se encuentra seca.\n\n` +
      `⚠️ *Nota de seguridad:* No se puede garantizar al 100% que una vía intermedia no reportada esté libre de encharcamientos debido a las lluvias continuas en Ciénaga. Transita con precaución.`;
    matchedBarrio = 'Kennedy';
  }
  // 2. Ruta Miramar -> La Floresta
  else if (query.includes('miramar') && (query.includes('floresta') || query.includes('sur'))) {
    reply = `📍 **Recomendación de Ruta: Miramar ➡️ La Floresta**\n\n` +
      `⚠️ **Advertencias:**\n` +
      `- En **Miramar (Calle 1 con Carrera 15)** hay 20cm de agua por confluencia de resaca y lluvia.\n` +
      `- En **El Carmen (Calle 12 con Carrera 18)** se reporta calzada resbalosa con lodo.\n\n` +
      `✅ **Ruta Sugerida:**\n` +
      `- Desvíate desde Miramar hacia la Carrera 18 tomando precaución en el cruce deprimido y conéctate directo con la Carrera 21 en La Floresta.\n\n` +
      `⚠️ *Aviso preventivo:* Evita orillarte a cunetas sin visibilidad.`;
    matchedBarrio = 'Miramar';
  }
  // 3. Barrio Abajo
  else if (query.includes('abajo') || query.includes('calle 13')) {
    reply = `🚨 **Estado de Barrio Abajo (Calle 13):**\n\n` +
      `Se reporta una **inundación severa con nivel de 45 cm** en Calle 13 con Carrera 9.\n` +
      `- El agua ha sobrepasado los andenes y hay una corriente fuerte hacia la Ciénaga.\n` +
      `- El paso está **totalmente bloqueado para motos y vehículos livianos**.\n\n` +
      `💡 **Desvío:** Utiliza la Calle 7 o la Carrera 21 para bordear el sector.`;
    matchedBarrio = 'Barrio Abajo';
  }
  // 4. Alcantarillas sin tapa
  else if (query.includes('alcantarilla') || query.includes('hueco') || query.includes('tapa')) {
    if (alcantarillas.length > 0) {
      const listado = alcantarillas.map(a => `• **${a.barrio}**: ${a.direccion} (${a.descripcion})`).join('\n');
      reply = `⚠️ **Puntos de Alto Riesgo con Alcantarillas o Huecos Peligrosos:**\n\n${listado}\n\n` +
        `🚨 **Precaución extrema:** Al estar cubiertas por agua turbia, estas trampas son invisibles. Si eres motociclista o peatón, no cruces calles con agua por encima de los 15 cm.`;
    } else {
      reply = `Actualmente no tenemos reportes activos de alcantarillas destapadas en el sistema, pero ten cautela en el Centro y Barrio Abajo.`;
    }
  }
  // 5. Vías Transitables
  else if (query.includes('transitable') || query.includes('segura') || query.includes('libre') || query.includes('abierta')) {
    if (transitables.length > 0) {
      const listado = transitables.map(t => `• **${t.barrio}** (${t.direccion}): ${t.descripcion}`).join('\n');
      reply = `✅ **Vías y Sectores Transitables Hoy en Ciénaga:**\n\n${listado}\n\n` +
        `Estas vías cuentan con buen drenaje o canales pluviales operativos en este momento.`;
    } else {
      reply = `Por el momento la mayoría de vías monitoreadas presentan algún grado de precaución. Mantén la velocidad baja.`;
    }
  }
  // 6. Centro Histórico
  else if (query.includes('centro') || query.includes('templete') || query.includes('plaza')) {
    reply = `🏛️ **Estado del Centro Histórico de Ciénaga:**\n\n` +
      `- **Peligro en Calle 9 con Cra 12 (Cerca al Templete):** Alcantarilla destapada oculta bajo 30cm de agua.\n` +
      `- **Vía Segura en Calle 7:** Pavimento despejado con conexión habilitada hacia la alcaldía.\n\n` +
      `⚠️ Se sugiere entrar al centro por el costado de la Calle 7 y no por las carreras occidentales.`;
    matchedBarrio = 'Centro Histórico';
  }
  // 7. Saludos
  else if (query.includes('hola') || query.includes('buenas') || query.includes('buenos dias') || query.includes('tardes')) {
    reply = `¡Hola! Con gusto te asisto. En Ciénaga tenemos actualmente **${peligros.length} zonas de peligro crítico** y **${transitables.length} vías transitables** confirmadas.\n\n¿A qué barrio deseas dirigirte o sobre qué calle necesitas información?`;
  }
  // 8. Consulta de un barrio específico
  else {
    const foundBarrio = BARRIOS_CIENAGA.find(b => query.includes(b.toLowerCase()));
    if (foundBarrio) {
      const reportsOfBarrio = reports.filter(r => r.barrio.toLowerCase() === foundBarrio.toLowerCase());
      if (reportsOfBarrio.length > 0) {
        const items = reportsOfBarrio.map(r => `• **${r.direccion}** [${r.severidad.toUpperCase()}]: ${r.descripcion} (Nivel: ${r.nivelAgua})`).join('\n');
        reply = `📍 **Reportes en el sector de ${foundBarrio}:**\n\n${items}\n\n` +
          `⚠️ *Aviso:* Si transitas por ${foundBarrio}, extrema precauciones.`;
      } else {
        reply = `No hay reportes recientes registrados específicamente para el barrio **${foundBarrio}**.\n\n` +
          `⚠️ *Advertencia de seguridad:* Al no contar con información suficiente registrada por la comunidad en este momento, no podemos garantizar que las vías de ${foundBarrio} estén libres de inundaciones. Si notas represamientos, por favor regístralos en el botón 'Reportar Incidente'.`;
      }
      matchedBarrio = foundBarrio;
    } else {
      reply = `He analizado tu consulta sobre la movilidad en Ciénaga.\n\n` +
        `Actualmente tenemos registrados **${reports.length} reportes comunitarios** en sectores como Barrio Abajo, Centro, Kennedy, Miramar, La Floresta y la Troncal.\n\n` +
        `⚠️ **Advertencia de seguridad obligatoria:** Recuerda que las condiciones pluviales en Ciénaga cambian rápidamente. Si tu barrio no tiene suficientes reportes registrados, no podemos garantizar al 100% que una vía esté libre de inundaciones o alcantarillas desbordadas.\n\n` +
        `¿Deseas consultar una ruta específica (ejemplo: *¿Cómo llego de Kennedy al Centro?*)?`;
    }
  }

  return { reply, matchedBarrio };
}

