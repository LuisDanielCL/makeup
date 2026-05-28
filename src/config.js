// Configuración central del sitio.
// Los valores se leen desde el archivo .env (variables que empiezan con VITE_).
// Si no hay .env configurado, se usan los valores de respaldo de abajo
// para que el sitio siga funcionando con datos de ejemplo.

export const config = {
  brandName: import.meta.env.VITE_BRAND_NAME || 'Estudio de Maquillaje',

  // Número de WhatsApp en formato internacional, solo dígitos.
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',

  // ID del Google Sheet que contiene los productos, galería y servicios.
  sheetId: import.meta.env.VITE_SHEET_ID || '',

  // Nombres de las pestañas (hojas) dentro del Google Sheet.
  sheets: {
    productos: 'Productos',
    galeria: 'Galeria',
    servicios: 'Servicios',
  },

  // Datos de contacto e información del negocio.
  contacto: {
    instagram: '', // ej: 'https://instagram.com/tu_usuario'
    email: '',
    ciudad: '',
  },
}
