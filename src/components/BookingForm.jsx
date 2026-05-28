import { useState } from 'react'
import SectionTitle from './SectionTitle.jsx'
import { whatsappLink, bookingMessage } from '../lib/whatsapp.js'

export default function BookingForm({ servicios = [] }) {
  const [form, setForm] = useState({
    nombre: '',
    servicio: '',
    fecha: '',
    hora: '',
    notas: '',
  })

  const update = (campo) => (e) =>
    setForm((f) => ({ ...f, [campo]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const mensaje = bookingMessage(form)
    window.open(whatsappLink(mensaje), '_blank', 'noopener')
  }

  const hoy = new Date().toISOString().split('T')[0]

  return (
    <section id="cita" className="bg-rose-50 py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionTitle
          eyebrow="Reserva tu lugar"
          title="Agenda tu cita"
          subtitle="Completa tus datos y se abrirá WhatsApp con tu solicitud lista para enviar. Te confirmamos disponibilidad por ese medio."
        />

        <form
          onSubmit={handleSubmit}
          className="reveal rounded-3xl bg-white p-7 shadow-md sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nombre completo" full>
              <input
                type="text"
                required
                value={form.nombre}
                onChange={update('nombre')}
                placeholder="Tu nombre"
                className="input"
              />
            </Field>

            <Field label="Servicio" full>
              <select
                required
                value={form.servicio}
                onChange={update('servicio')}
                className="input"
              >
                <option value="">Selecciona un servicio</option>
                {servicios.map((s, i) => (
                  <option key={i} value={s.nombre}>
                    {s.nombre}
                  </option>
                ))}
                <option value="Otro">Otro / No estoy segura</option>
              </select>
            </Field>

            <Field label="Fecha">
              <input
                type="date"
                required
                min={hoy}
                value={form.fecha}
                onChange={update('fecha')}
                className="input"
              />
            </Field>

            <Field label="Hora">
              <input
                type="time"
                required
                value={form.hora}
                onChange={update('hora')}
                className="input"
              />
            </Field>

            <Field label="Notas (opcional)" full>
              <textarea
                rows={3}
                value={form.notas}
                onChange={update('notas')}
                placeholder="Cuéntanos del evento, ubicación, referencias…"
                className="input resize-none"
              />
            </Field>
          </div>

          <button
            type="submit"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 py-3.5 font-medium text-white transition-colors hover:bg-rose-600"
          >
            <WhatsAppIcon />
            Enviar por WhatsApp
          </button>
        </form>
      </div>

      {/* Estilos de los campos del formulario */}
      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #f3d0d7;
          background: #fff;
          padding: 0.7rem 0.9rem;
          font-size: 0.95rem;
          color: #3a3236;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input:focus {
          border-color: #d57f90;
          box-shadow: 0 0 0 3px rgba(213,127,144,.18);
        }
      `}</style>
    </section>
  )
}

function Field({ label, full, children }) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="mb-1.5 block text-sm font-medium text-stone-700">
        {label}
      </span>
      {children}
    </label>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.519 5.26l-.999 3.648 3.97-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}
