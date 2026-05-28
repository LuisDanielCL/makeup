import { useMemo, useState } from 'react'
import SectionTitle from './SectionTitle.jsx'

export default function Galeria({ items = [], loading }) {
  const [filtro, setFiltro] = useState('Todas')
  const [activa, setActiva] = useState(null) // imagen ampliada

  const categorias = useMemo(() => {
    const set = new Set(items.map((i) => i.categoria).filter(Boolean))
    return ['Todas', ...set]
  }, [items])

  const visibles =
    filtro === 'Todas' ? items : items.filter((i) => i.categoria === filtro)

  return (
    <section id="galeria" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Nuestro trabajo"
          title="Galería"
          subtitle="Una muestra de transformaciones reales. Cada rostro, una historia."
        />

        {categorias.length > 1 && (
          <div className="reveal mb-10 flex flex-wrap justify-center gap-3">
            {categorias.map((c) => (
              <button
                key={c}
                onClick={() => setFiltro(c)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  filtro === c
                    ? 'bg-rose-500 text-white'
                    : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-center text-stone-500">Cargando galería…</p>
        ) : (
          <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {visibles.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiva(item)}
                className="reveal group relative block w-full overflow-hidden rounded-2xl"
              >
                <img
                  src={item.imagen}
                  alt={item.titulo || 'Trabajo de maquillaje'}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {(item.titulo || item.categoria) && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-left opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="block font-serif text-lg text-white">
                      {item.titulo}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-white/80">
                      {item.categoria}
                    </span>
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {activa && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiva(null)}
        >
          <img
            src={activa.imagen}
            alt={activa.titulo || ''}
            className="max-h-[90vh] max-w-full rounded-xl object-contain"
          />
          <button
            className="absolute right-5 top-5 text-3xl text-white"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
      )}
    </section>
  )
}
