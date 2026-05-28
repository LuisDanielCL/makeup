import { config } from '../config.js'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-rose-700/40 via-rose-600/30 to-nude-50" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center">
        <p className="mb-4 font-medium uppercase tracking-[0.3em] text-white/90">
          Maquillaje profesional
        </p>
        <h1 className="font-serif text-5xl font-semibold leading-tight text-white drop-shadow sm:text-6xl md:text-7xl">
          {config.brandName}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">
          Realzamos tu belleza para novias, eventos y sesiones. Agenda tu cita,
          descubre nuestro trabajo y encuentra tus productos favoritos.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#cita"
            className="rounded-full bg-rose-500 px-8 py-3 font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-rose-600"
          >
            Agendar cita
          </a>
          <a
            href="#galeria"
            className="rounded-full border border-white/80 px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
          >
            Ver galería
          </a>
        </div>
      </div>
    </section>
  )
}
