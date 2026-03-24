export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  srcDir: '.',

  runtimeConfig: {
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    public: {
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    },
  },

  ssr: false,

  app: {
    head: {
      title: 'La Mar Salá - Restaurante',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Restaurante especializado en pescado salvaje y marisco de alta calidad, situado muy cerca del casco histórico de Toledo.',
        },
        { property: 'og:site_name', content: 'La Mar Salá - Restaurante' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://lamarsalatoledo.com' },
        { property: 'og:title', content: 'La Mar Salá - Restaurante' },
        {
          property: 'og:description',
          content:
            'Restaurante especializado en pescado salvaje y marisco de alta calidad, situado muy cerca del casco histórico de Toledo.',
        },
        { property: 'og:image', content: '/img/logo_la_mar_sala.png' },
        { property: 'og:image:width', content: '280' },
        { property: 'og:image:height', content: '115' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  css: ['~/assets/main.scss'],

  vite: {
    optimizeDeps: {
      exclude: ['@tiptap/vue-3', '@tiptap/starter-kit', '@tiptap/core', '@popperjs/core'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/vars/vars.scss" as *;',
        },
      },
    },
  },

  components: true,

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
'@vite-pwa/nuxt',
    'nuxt-svgo',
  ],

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
})
