export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'La Mar Salá - Restaurante',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Restaurante especializado en pescado salvaje y marisco de alta calidad, situado muy cerca del casco histórico de Toledo.',
      },
      { property: 'og:site_name', content: 'La Mar Salá - Restaurante' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://lamarsalatoledo.com',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'La Mar Salá - Restaurante',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Restaurante especializado en pescado salvaje y marisco de alta calidad, situado muy cerca del casco histórico de Toledo.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/img/logo_la_mar_sala.png',
      },
      { property: 'og:image:width', content: '280' },
      { property: 'og:image:height', content: '115' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS
  css: ['~/assets/main.scss'],
  styleResources: {
    scss: ['~/assets/vars/*.scss'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/vueExcel' },
    { src: '~/plugins/firebase' },
    { src: '~/plugins/localStorage', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-svg-loader',
    ['vue-scrollto/nuxt', { duration: 500, easing: 'ease' }],
  ],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      configFile: './babel.config.js',
    },
  },
}
