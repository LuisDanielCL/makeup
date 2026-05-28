import { config } from '../config.js'

// Lee datos desde una pestaña de un Google Sheet público usando el endpoint
// "gviz" de Google (no requiere API key ni backend).
//
// REQUISITO: el Google Sheet debe estar compartido como
// "Cualquier persona con el enlace -> Lector".
//
// Devuelve un array de objetos donde las claves son los encabezados de la
// primera fila de la hoja (en minúsculas y sin espacios).

function buildUrl(sheetName) {
  const id = config.sheetId
  const sheet = encodeURIComponent(sheetName)
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&sheet=${sheet}`
}

// El endpoint gviz devuelve algo como:
//   /*O_o*/\ngoogle.visualization.Query.setResponse({...});
// Hay que recortar ese envoltorio para quedarnos con el JSON.
function parseGviz(text) {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end === -1) {
    throw new Error('Respuesta de Google Sheets con formato inesperado')
  }
  const json = JSON.parse(text.slice(start, end + 1))
  // Rango de "marcas diacríticas combinantes" (acentos) para limpiarlos.
  const acentos = new RegExp('[\\u0300-\\u036f]', 'g')
  const cols = json.table.cols.map((c) =>
    (c.label || c.id || '')
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(acentos, ''), // quita acentos
  )

  return json.table.rows
    .map((row) => {
      const obj = {}
      row.c.forEach((cell, i) => {
        const key = cols[i]
        if (!key) return
        let value = cell ? cell.v : ''
        // Las celdas de tipo fecha vienen como objeto; usamos el texto formateado.
        if (cell && cell.f != null) value = cell.f
        obj[key] = value == null ? '' : value
      })
      return obj
    })
    // Ignora filas completamente vacías.
    .filter((obj) => Object.values(obj).some((v) => String(v).trim() !== ''))
}

export async function fetchSheet(sheetName) {
  if (!config.sheetId) {
    throw new Error('NO_SHEET_ID')
  }
  const res = await fetch(buildUrl(sheetName))
  if (!res.ok) {
    throw new Error(`Error al cargar la hoja "${sheetName}" (HTTP ${res.status})`)
  }
  const text = await res.text()
  return parseGviz(text)
}
