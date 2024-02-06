const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  register: true,
  skipWaiting: true
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    unoptimized: true,
  }
  // images: {
  //   domains: ['your-image-domain.com'], // Añade los dominios de las imágenes aquí
  // },
  //webpack: (config, { isServer }) => {
    // Soluciona problemas con la importación de fs en Next.js
  //  if (!isServer) {
  //    config.node = {
  //      fs: 'empty'
  //    }
  //  }
  //  return config
  //},
  // cualquier otra configuración
})