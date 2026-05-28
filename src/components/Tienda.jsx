import { useMemo, useState } from 'react'
import SectionTitle from './SectionTitle.jsx'
import ProductCard from './ProductCard.jsx'

export default function Tienda({ productos = [], loading }) {
  const [filtro, setFiltro] = useState('Todos')

  const categorias = useMemo(() => {
    const set = new Set(productos.map((p) => p.categoria).filter(Boolean))
    return ['Todos', ...set]
  }, [productos])

  const visibles =
    filtro === 'Todos'
      ? productos
      : productos.filter((p) => p.categoria === filtro)

  return (
    <section id="tienda" className="bg-nude-100 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Tienda"
          title="Nuestros productos"
          subtitle="Los mismos productos que usamos en nuestro trabajo. Compra fácil y rápido por WhatsApp."
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
                    : 'bg-white text-rose-600 hover:bg-rose-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-center text-stone-500">Cargando productos…</p>
        ) : visibles.length === 0 ? (
          <p className="text-center text-stone-500">
            Pronto agregaremos productos.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibles.map((p, i) => (
              <ProductCard key={i} producto={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
