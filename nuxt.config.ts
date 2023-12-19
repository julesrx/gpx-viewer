export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ['ol/ol.css'],
  typescript: { typeCheck: true, strict: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'GPX Viewer',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/gpx-viewer/favicon.png' }]
    }
  }
});
