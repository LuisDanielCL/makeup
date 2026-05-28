import { whatsappLink, productMessage, formatPrice } from '../lib/whatsapp.js'

export default function ProductCard({ producto }) {
  const disponible = !/^(no|false|0|agotado)$/i.test(
    String(producto.disponible || 'si').trim(),
  )

  return (
    <article className="reveal group flex flex-col overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-nude-100">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-300">
            Sin imagen
          </div>
        )}
        {producto.categoria && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-rose-600">
            {producto.categoria}
          </span>
        )}
        {!disponible && (
          <span className="absolute right-3 top-3 rounded-full bg-stone-800/80 px-3 py-1 text-xs font-medium text-white">
            Agotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-medium text-stone-800">{producto.nombre}</h3>
        {producto.descripcion && (
          <p className="mt-1.5 flex-1 text-sm text-stone-500">
            {producto.descripcion}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-rose-600">
            {formatPrice(producto.precio)}
          </span>
        </div>

        <a
          href={disponible ? whatsappLink(productMessage(producto)) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!disponible}
          className={`mt-4 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition-colors ${
            disponible
              ? 'bg-rose-500 text-white hover:bg-rose-600'
              : 'pointer-events-none bg-stone-200 text-stone-400'
          }`}
        >
          {disponible ? 'Comprar por WhatsApp' : 'No disponible'}
        </a>
      </div>
    </article>
  )
}
