import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Servicios from './components/Servicios.jsx'
import Galeria from './components/Galeria.jsx'
import Tienda from './components/Tienda.jsx'
import BookingForm from './components/BookingForm.jsx'
import Footer from './components/Footer.jsx'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'
import { useSheet, useReveal } from './hooks/useSheet.js'
import { config } from './config.js'
import {
  demoServicios,
  demoGaleria,
  demoProductos,
} from './lib/demoData.js'

export default function App() {
  const servicios = useSheet(config.sheets.servicios, demoServicios)
  const galeria = useSheet(config.sheets.galeria, demoGaleria)
  const productos = useSheet(config.sheets.productos, demoProductos)

  // Activa las animaciones de aparición al hacer scroll.
  useReveal()

  const usandoDemo =
    servicios.isDemo && galeria.isDemo && productos.isDemo

  return (
    <>
      <Navbar />

      {usandoDemo && (
        <div className="fixed inset-x-0 top-[68px] z-40 bg-amber-100 px-4 py-2 text-center text-xs text-amber-800">
          ⚠️ Mostrando datos de ejemplo. Configura tu Google Sheet en el archivo
          <code className="mx-1 rounded bg-amber-200 px-1">.env</code>
          para ver tu contenido real.
        </div>
      )}

      <main>
        <Hero />
        <Servicios servicios={servicios.data} loading={servicios.loading} />
        <Galeria items={galeria.data} loading={galeria.loading} />
        <Tienda productos={productos.data} loading={productos.loading} />
        <BookingForm servicios={servicios.data} />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
