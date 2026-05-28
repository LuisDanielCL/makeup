import { config } from '../config.js'

// Construye un enlace de WhatsApp con un mensaje prellenado.
// Al hacer clic, abre WhatsApp (app o web) con el chat listo para enviar.
export function whatsappLink(message) {
  const number = config.whatsappNumber.replace(/\D/g, '')
  const text = encodeURIComponent(message)
  if (!number) {
    // Sin número configurado: abre WhatsApp con solo el mensaje.
    return `https://wa.me/?text=${text}`
  }
  return `https://wa.me/${number}?text=${text}`
}

// Mensaje para AGENDAR UNA CITA.
export function bookingMessage({ nombre, servicio, fecha, hora, notas }) {
  const lineas = [
    `¡Hola! Quiero agendar una cita 💄`,
    ``,
    `*Nombre:* ${nombre || '-'}`,
    `*Servicio:* ${servicio || '-'}`,
    `*Fecha:* ${fecha || '-'}`,
    `*Hora:* ${hora || '-'}`,
  ]
  if (notas) lineas.push(`*Notas:* ${notas}`)
  return lineas.join('\n')
}

// Mensaje para COMPRAR UN PRODUCTO.
export function productMessage(producto) {
  const lineas = [
    `¡Hola! Me interesa este producto 🛍️`,
    ``,
    `*Producto:* ${producto.nombre || '-'}`,
  ]
  if (producto.precio) lineas.push(`*Precio:* ${formatPrice(producto.precio)}`)
  lineas.push('', '¿Está disponible?')
  return lineas.join('\n')
}

// Formatea un precio. Acepta números o texto; si es número lo muestra con separadores.
export function formatPrice(value) {
  if (value === '' || value == null) return ''
  const num = Number(String(value).replace(/[^0-9.,-]/g, '').replace(',', '.'))
  if (Number.isFinite(num) && num > 0) {
    return num.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    })
  }
  return String(value)
}
