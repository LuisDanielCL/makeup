import { useState, useEffect } from 'react'
import { config } from '../config.js'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#galeria', label: 'Galería' },
  { href: '#tienda', label: 'Tienda' },
  { href: '#cita', label: 'Agendar' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-nude-50/95 shadow-sm backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#inicio" className="font-serif text-2xl font-semibold text-rose-600">
          {config.brandName}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-stone-700 transition-colors hover:text-rose-500"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#cita"
          className="hidden rounded-full bg-rose-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-600 md:inline-block"
        >
          Reservar
        </a>

        <button
          aria-label="Abrir menú"
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block h-0.5 w-6 bg-stone-700 transition" />
          <span className="mt-1.5 block h-0.5 w-6 bg-stone-700" />
          <span className="mt-1.5 block h-0.5 w-6 bg-stone-700" />
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 border-t border-rose-100 bg-nude-50 px-5 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-stone-700 hover:text-rose-500"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
