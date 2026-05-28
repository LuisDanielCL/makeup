import { useEffect, useState } from 'react'
import { fetchSheet } from '../lib/sheets.js'

// Hook que carga una hoja del Google Sheet.
// Si no hay Sheet configurado (o falla la carga), devuelve los datos de
// ejemplo pasados en `fallback`, marcando `isDemo = true`.
export function useSheet(sheetName, fallback = []) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true
    setLoading(true)

    fetchSheet(sheetName)
      .then((rows) => {
        if (!activo) return
        if (rows && rows.length > 0) {
          setData(rows)
          setIsDemo(false)
        } else {
          setData(fallback)
          setIsDemo(true)
        }
        setError(null)
      })
      .catch((err) => {
        if (!activo) return
        // Sin Sheet o error de red -> usamos datos de ejemplo.
        setData(fallback)
        setIsDemo(true)
        setError(err.message === 'NO_SHEET_ID' ? null : err.message)
      })
      .finally(() => {
        if (activo) setLoading(false)
      })

    return () => {
      activo = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetName])

  return { data, loading, isDemo, error }
}

// Pequeño hook para animar elementos al entrar en pantalla.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  })
}
