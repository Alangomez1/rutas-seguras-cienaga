# RUTAS SEGURAS CIÉNAGA (MAGDALENA)
### Plataforma Web de Alerta Temprana, Mapeo Comunitario y Asistencia de Movilidad con Inteligencia Artificial

---

## 📌 1. Descripción del Proyecto
**RUTAS SEGURAS CIÉNAGA** es una solución tecnológica Full Stack orientada a la prevención de accidentes, mitigación de riesgos y asistencia de movilidad en el municipio de **Ciénaga, Magdalena (Colombia)**, durante temporadas de lluvias intensas y contingencias por inundación pluvial y marítima.

La plataforma permite a los ciudadanos:
1. **Visualizar zonas anegadas y puntos de alto riesgo** en un mapa interactivo con OpenStreetMap y Leaflet.
2. **Identificar alcantarillas destapadas y socavones** que resultan invisibles bajo el agua turbia.
3. **Consultar un Agente de Inteligencia Artificial ("Rutas Seguras IA")** para obtener rutas alternativas seguras de tránsito entre barrios.
4. **Reportar incidentes ciudadanos en tiempo real** con geolocalización GPS y evidencia fotográfica (persistidos mediante `localStorage`).
5. **Monitorear estadísticas e indicadores clave (KPIs)** del estado de la red vial urbana de Ciénaga.

---

## 🎨 2. Organización de las "Idas" (Vistas del Sistema) y Skins Adaptables

### 📍 Organización de las "Idas" (Flujo de Navegación y Vistas):
El sistema estructura el flujo de navegación mediante un menú lateral (Sidebar) responsivo y persistente:
- **`Inicio & Métricas` (Dashboard)**: Vista gerencial con indicadores clave (Total de reportes, calles anegadas, vías transitables, gráficos de severidad y accesos rápidos).
- **`Mapa de Riesgos`**: Visualización geoespacial de Ciénaga, Magdalena ([11.0069° N, -74.2486° W]) con filtros por nivel de severidad (Peligro, Precaución, Transitable) y filtro por barrios.
- **`Consultar IA` (Rutas Seguras IA)**: Asistente conversacional con procesamiento de lenguaje natural local que analiza los incidentes activos y sugiere corredores seguros.
- **`Reportar Incidente`**: Formulario ciudadano para registrar inundaciones, socavones o tapas levantadas con captura de coordenadas y fotografía.
- **`Líneas de Emergencia`**: Directorio institucional con enlaces directos a Bomberos Ciénaga, Defensa Civil, Cruz Roja y Policía.

### 🎭 Sistema de "Skins" (Temas Adaptables):
Se diseñó un selector de temas en vivo para responder a diversos escenarios de uso ciudadano y de emergencia:
1. **Skin Institucional / Oficial (Azul Marino & Celeste)**:
   - Paleta: `#0a192f`, `#0284c7`, `#ffffff` con acentos de advertencia rojos y amarillos.
   - Ideal para uso diurno, presentación formal y entidades públicas (Alcaldía / Gestión del Riesgo).
2. **Skin Tormenta Nocturna (Dark Mode de Alto Rendimiento)**:
   - Paleta: Fondo carbón/azul pizarra oscuro (`#070d18`, `#0e1a2e`) con marcadores de alto brillo.
   - Reduce el deslumbramiento en condiciones de lluvia nocturna y ahorra batería en dispositivos móviles.
3. **Skin Alerta Máxima (Rescate y Alta Visibilidad)**:
   - Paleta: Tonos intensos carmesí (`#7f1d1d`) y amarillo advertencia (`#fbbf24`).
   - Diseñado para operadores de socorro en campo bajo luz solar directa o situaciones críticas.

---

## 🧠 3. Agente de Inteligencia Artificial ("Rutas Seguras IA")
El asistente conversacional implementa un motor de razonamiento contextual que opera **100% de manera local y gratuita** (sin dependencias de APIs de pago).

### Capacidades del Agente:
- **Detección de Origen y Destino**: Identifica trayectos frecuentes (ejemplo: *Kennedy -> Centro*, *Miramar -> La Floresta*).
- **Cruce en Tiempo Real con Reportes**: Analiza los incidentes almacenados en `localStorage` antes de emitir una respuesta.
- **Advertencias Específicas**: Alerta sobre calles críticas como la Calle 13 en Barrio Abajo o la Calle 9 con Cra 12 en el Centro.
- **Recomendación de Corredores Seguros**: Sugiere desvíos por vías transitables (como la Carrera 21 en La Floresta o Calle 7).
- **Descargo de Seguridad Obligatorio**: Si la información sobre una vía no es concluyente, el agente advierte formalmente que no puede garantizar al 100% que el tramo esté libre de agua.

---

## 🗺️ 4. Sectores y Barrios de Ciénaga Modelados
- **Centro Histórico**: Calle 7, Calle 9 con Carrera 12 (Peligro por tapas levantadas cerca al Templete).
- **Barrio Abajo**: Calle 13 con Carrera 9 (Cota deprimida con inundaciones críticas de 45 cm).
- **Miramar**: Calle 1 con Carrera 15 (Sector costero con confluencia de oleaje y pluviosidad).
- **Kennedy**: Calle 28 cerca de la Troncal (Socavón profundo oculto bajo el agua).
- **La Floresta**: Carrera 21 con Calle 16 (Canal pluvial operativo, vía transitable recomendada).
- **Troncal del Caribe**: Calle 24 con Carrera 10 (Corredor nacional despejado).
- **El Carmen**: Calle 12 con Carrera 18 (Sedimento y lodo en la calzada).

---

## 🚀 5. Cómo Ejecutar el Proyecto

### Opción A (Inmediata - Doble Clic):
1. Haz doble clic en el archivo **`abrir_aplicacion.bat`**.
2. Se abrirá automáticamente en tu navegador (Google Chrome o Microsoft Edge). No requiere instalaciones previas.

### Opción B (Servidor Local Node.js):
```bash
node server.js
```
Abre tu navegador en: `http://localhost:3000`

### Opción C (Entorno de Desarrollo Modular React + TypeScript con Vite):
```bash
npm install
npm run dev
```

---

## 📂 6. Estructura del Código Fuente
```
trabajofinal/
├── abrir_aplicacion.bat       # Lanzador inmediato para Windows
├── index.html                 # Aplicación completa React 18 + Leaflet + Tailwind
├── server.js                  # Servidor HTTP ligero en Node.js (ESM)
├── package.json               # Configuración del proyecto y dependencias
├── tsconfig.json              # Configuración de compilador TypeScript
├── vite.config.ts             # Configuración de empaquetado Vite
└── src/
    ├── main.tsx               # Punto de entrada React
    ├── App.tsx                # Componente principal y gestión de estado
    ├── types/
    │   └── index.ts           # Interfaces y tipos TypeScript
    ├── data/
    │   └── mockData.ts        # Reportes iniciales, rutas y directorio de Ciénaga
    ├── services/
    │   └── aiAssistantService.ts # Motor NLP y lógica de decisión de la IA
    └── components/
        ├── Sidebar.tsx        # Navegación lateral y selector de skins
        ├── Dashboard.tsx      # Métricas, KPIs y gráficos de distribución
        ├── RiskMap.tsx        # Mapa interactivo Leaflet con marcadores dinámicos
        ├── AiAssistant.tsx    # Interfaz de chat conversacional
        ├── ReportModal.tsx    # Formulario con GPS y fotos
        └── EmergencyDirectory.tsx # Números de emergencia de Ciénaga
```

---

## 🎓 7. Preparado para Sustentación Universitaria
Este proyecto cumple con los más altos estándares de ingeniería de software para proyectos de grado y sustentaciones académicas:
- Tipado estricto con **TypeScript**.
- Componentización modular y desacoplada en **React**.
- Almacenamiento persistente en cliente con **`localStorage`**.
- Resiliencia y accesibilidad multiplataforma (computador y celular).
- Cero costos operativos y datos verosímiles de la geografía de Ciénaga, Magdalena.

