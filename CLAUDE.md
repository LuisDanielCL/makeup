# CLAUDE.md

Guía para retomar este proyecto. Léela antes de hacer cambios.

## Qué es

Página web (una sola página con scroll) para un **negocio de maquillaje**. Tres
funciones principales:

1. **Agendar citas** — formulario que abre WhatsApp con la solicitud prellenada.
2. **Galería** — trabajos previos, con filtro por categoría y lightbox.
3. **Tienda** — catálogo de productos con botón "Comprar por WhatsApp".

Está en **español** y orientada a que la dueña administre el contenido **sin
tocar código**.

## Stack y decisiones de arquitectura

- **React 18 + Vite 6 + Tailwind CSS v4** (Tailwind se configura vía el plugin
  `@tailwindcss/vite`; no hay `tailwind.config.js` ni `postcss.config.js`. Los
  tokens de tema viven en `@theme {}` dentro de `src/index.css`).
- **Sin backend.** Todo el contenido (servicios, galería, productos) se lee de
  un **Google Sheet** público vía el endpoint `gviz` (no requiere API key). Ver
  `src/lib/sheets.js`.
- **Imágenes en Cloudinary** — solo se guardan las URLs en el Sheet.
- **WhatsApp** para citas y compras: se generan enlaces `https://wa.me/...` con
  mensaje prellenado. Ver `src/lib/whatsapp.js`.
- **Datos de ejemplo**: si no hay Sheet configurado o falla la carga, el sitio
  muestra `src/lib/demoData.js` y aparece un banner amarillo de aviso. Lógica en
  `src/hooks/useSheet.js` (`isDemo`).

Decisiones tomadas con el usuario (no revertir sin preguntar):
- Citas por WhatsApp (NO sistema de reservas con backend).
- Catálogo administrado desde Google Sheets (NO panel de admin).
- Imágenes en Cloudinary (se descartó Google Drive por links inestables).

## Estructura

```
src/
├── components/   Navbar, Hero, Servicios, Galeria, Tienda, ProductCard,
│                 BookingForm, Footer, FloatingWhatsApp, SectionTitle
├── hooks/        useSheet (carga datos + fallback demo), useReveal (animaciones)
├── lib/          sheets.js (Google Sheets), whatsapp.js (enlaces/mensajes),
│                 demoData.js (datos de ejemplo)
├── config.js     Configuración central (lee variables VITE_ del .env)
├── App.jsx       Arma todas las secciones y carga los 3 Sheets
├── main.jsx      Punto de entrada
└── index.css     Tailwind + tema (colores rose/nude/gold, fuentes)
```

## Comandos

> ⚠️ Node se instaló con winget y puede NO estar en el PATH de terminales/procesos
> viejos. Si `node`/`npm` "no se reconoce", antepón el PATH:
> `$env:Path = "C:\Program Files\nodejs;" + $env:Path` (PowerShell). En una
> terminal nueva ya debería estar disponible.

```bash
npm install      # primera vez
npm run dev      # desarrollo (http://localhost:5173)
npm run build    # build de producción -> dist/
npm run preview  # previsualiza el build
```

## Configuración (archivo .env)

Copiar `.env.example` a `.env`:

```env
VITE_WHATSAPP_NUMBER=521XXXXXXXXXX   # código de país, sin "+", sin espacios
VITE_SHEET_ID=                       # ID entre /d/ y /edit en la URL del Sheet
VITE_BRAND_NAME=Estudio de Maquillaje
```

`.env` está en `.gitignore` (no se commitea).

## Estructura del Google Sheet

Tres pestañas con nombres EXACTOS. La primera fila son los encabezados (las
claves se normalizan a minúsculas y sin acentos en `sheets.js`):

- **Servicios**: `nombre | descripcion | precio | duracion`
- **Galeria**: `titulo | categoria | imagen`
- **Productos**: `nombre | descripcion | precio | categoria | imagen | disponible`
  - `disponible`: `si`/`no` (vacío = disponible). Valores que marcan agotado:
    `no`, `false`, `0`, `agotado`.

Compartir el Sheet como **"Cualquier persona con el enlace → Lector"**.

## Estado actual (2026-05-28)

- ✅ Proyecto creado, `npm install` OK, `npm run build` OK (42 módulos, sin errores).
- ✅ Repo en GitHub: https://github.com/LuisDanielCL/makeup (público, rama `master`).
- ⏳ PENDIENTE: el usuario debe crear el `.env`, el Google Sheet real y subir
  imágenes a Cloudinary. Mientras tanto se ven datos de ejemplo.
- ⏳ El sitio web (todo `src/`, configs, README) **aún NO se ha commiteado** al
  momento de escribir esto. Solo está commiteado el commit inicial (README +
  .gitignore). Confirmar con el usuario antes de commitear.

## Notas / gotchas

- El preview MCP (`preview_start`) falla mientras Node no esté en el PATH global
  (instalación reciente). Usar `npm run dev` con el PATH antepuesto, o reiniciar
  la terminal.
- `formatPrice` en `whatsapp.js` formatea como MXN por defecto. Cambiar `currency`
  si el negocio usa otra moneda.
- Las imágenes de ejemplo vienen de Unsplash; se reemplazan solas al conectar el Sheet.

## Ideas / posibles mejoras futuras

- Sección de testimonios/reseñas (otra pestaña del Sheet).
- Deploy automático (Vercel / Netlify / GitHub Pages).
- Cambiar de single-page a rutas (react-router) si crece.
- SEO/meta tags y Open Graph para compartir en redes.
