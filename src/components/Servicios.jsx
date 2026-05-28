import SectionTitle from './SectionTitle.jsx'
import { formatPrice } from '../lib/whatsapp.js'

export default function Servicios({ servicios = [], loading }) {
  return (
    <section id="servicios" className="bg-nude-50 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Lo que hacemos"
          title="Nuestros servicios"
          subtitle="Cada look se diseña a la medida de ti y de tu ocasión especial."
        />

        {loading ? (
          <p className="text-center text-stone-500">Cargando servicios…</p>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s, i) => (
              <article
                key={i}
                className="reveal flex flex-col rounded-2xl border border-rose-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-serif text-2xl font-semibold text-stone-800">
                  {s.nombre}
                </h3>
                <p className="mt-3 flex-1 text-stone-600">{s.descripcion}</p>
                <div className="mt-6 flex items-center justify-between border-t border-rose-50 pt-4">
                  <span className="text-lg font-semibold text-rose-600">
                    {formatPrice(s.precio)}
                  </span>
                  {s.duracion && (
                    <span className="text-sm text-stone-500">{s.duracion}</span>
                  )}
                </div>
                <a
                  href="#cita"
                  className="mt-5 rounded-full bg-rose-50 py-2.5 text-center text-sm font-medium text-rose-600 transition-colors hover:bg-rose-100"
                >
                  Reservar este servicio
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
