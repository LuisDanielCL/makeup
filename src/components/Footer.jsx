import { config } from '../config.js'
import { whatsappLink } from '../lib/whatsapp.js'

export default function Footer() {
  const { contacto, brandName } = config
  return (
    <footer className="bg-stone-900 py-14 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-3">
        <div>
          <h3 className="font-serif text-2xl text-white">{brandName}</h3>
          <p className="mt-3 text-sm text-stone-400">
            Maquillaje profesional para novias, eventos y sesiones.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-medium text-white">Navegación</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#servicios" className="hover:text-rose-300">Servicios</a></li>
            <li><a href="#galeria" className="hover:text-rose-300">Galería</a></li>
            <li><a href="#tienda" className="hover:text-rose-300">Tienda</a></li>
            <li><a href="#cita" className="hover:text-rose-300">Agendar cita</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-medium text-white">Contacto</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={whatsappLink('¡Hola! Tengo una consulta 😊')}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-300"
              >
                WhatsApp
              </a>
            </li>
            {contacto.instagram && (
              <li>
                <a href={contacto.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-rose-300">
                  Instagram
                </a>
              </li>
            )}
            {contacto.email && (
              <li><a href={`mailto:${contacto.email}`} className="hover:text-rose-300">{contacto.email}</a></li>
            )}
            {contacto.ciudad && <li className="text-stone-400">{contacto.ciudad}</li>}
          </ul>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {brandName}. Todos los derechos reservados.
      </p>
    </footer>
  )
}
