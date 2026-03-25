export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  srcDir: '.',

  runtimeConfig: {
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    public: {
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      cloudinaryUploadPreset: process.env.NUXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseDatabaseUrl: process.env.NUXT_PUBLIC_FIREBASE_DATABASE_URL,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'La Mar Salá',
      short_name: 'La Mar Salá',
      theme_color: '#008d8a',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        { src: '/img/simbolo_la_mar_sala.png', sizes: '192x192', type: 'image/png' },
        { src: '/img/simbolo_la_mar_sala.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,ico,webp}'],
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      clientsClaim: true,
    },
    devOptions: {
      enabled: false,
    },
  },

  generate: {
    dir: 'dist',
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
})
