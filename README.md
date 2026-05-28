# Estudio de Maquillaje 💄

Página web para un negocio de maquillaje con tres funciones principales:

- **Agendar citas** — formulario que abre WhatsApp con la solicitud lista.
- **Galería** — muestra trabajos previos (con filtros por categoría).
- **Tienda** — catálogo de productos con compra directa por WhatsApp.

El contenido (servicios, galería y productos) se administra desde un
**Google Sheet**, sin tocar el código. Las imágenes se alojan en **Cloudinary**.

---

## 🛠️ Tecnología

- React + Vite
- Tailwind CSS v4
- Datos desde Google Sheets (sin backend)
- WhatsApp para citas y compras

## 🚀 Cómo correr el proyecto

```bash
npm install      # instala dependencias (solo la primera vez)
npm run dev      # inicia el sitio en modo desarrollo
```

Luego abre la URL que aparece en la terminal (normalmente
http://localhost:5173).

Para generar la versión final lista para publicar:

```bash
npm run build    # genera la carpeta dist/
npm run preview  # previsualiza la versión final
```

---

## ⚙️ Configuración (archivo `.env`)

1. Copia `.env.example` y renómbralo a `.env`.
2. Rellena tus datos:

```env
VITE_WHATSAPP_NUMBER=521XXXXXXXXXX   # tu número con código de país, sin "+"
VITE_SHEET_ID=                       # el ID de tu Google Sheet
VITE_BRAND_NAME=Nombre de tu estudio
```

> Si no configuras el `.env`, el sitio funciona igual pero muestra **datos de
> ejemplo** (verás un aviso amarillo arriba).

---

## 📊 Cómo administrar el contenido (Google Sheets)

1. Crea un Google Sheet nuevo.
2. Crea **tres pestañas** con estos nombres exactos: `Servicios`, `Galeria`,
   `Productos`.
3. La **primera fila** de cada pestaña son los encabezados (las columnas):

   **Pestaña `Servicios`**

   | nombre | descripcion | precio | duracion |
   | ------ | ----------- | ------ | -------- |

   **Pestaña `Galeria`**

   | titulo | categoria | imagen |
   | ------ | --------- | ------ |

   **Pestaña `Productos`**

   | nombre | descripcion | precio | categoria | imagen | disponible |
   | ------ | ----------- | ------ | --------- | ------ | ---------- |

   - `imagen`: el enlace de la imagen (ver Cloudinary abajo).
   - `disponible`: escribe `si` o `no` (si lo dejas vacío, se asume `si`).

4. Comparte el Sheet: botón **Compartir → Acceso general → "Cualquier persona
   con el enlace" → Lector**.
5. Copia el **ID** desde la URL del Sheet:
   `https://docs.google.com/spreadsheets/d/`**`ESTE_ES_EL_ID`**`/edit`
   y pégalo en `VITE_SHEET_ID` dentro de `.env`.

Cada vez que edites el Sheet, el sitio mostrará el contenido actualizado al
recargar la página.

---

## 🖼️ Imágenes con Cloudinary

1. Crea una cuenta gratis en [cloudinary.com](https://cloudinary.com).
2. Sube tus fotos en **Media Library**.
3. En cada imagen, copia su enlace (**Copy URL**).
4. Pega ese enlace en la columna `imagen` del Google Sheet.

Tip: puedes optimizar agregando `/f_auto,q_auto/` en la URL de Cloudinary,
justo después de `/upload`, para que cargue más rápido.

---

## 📁 Estructura

```
src/
├── components/   Componentes visuales (Navbar, Hero, Tienda, etc.)
├── hooks/        Lógica reutilizable (carga de datos, animaciones)
├── lib/          Google Sheets, WhatsApp y datos de ejemplo
├── config.js     Configuración central
├── App.jsx       Arma todas las secciones
└── main.jsx      Punto de entrada
```
