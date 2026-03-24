module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    // Nuxt auto-imports
    defineNuxtConfig: 'readonly',
    defineNuxtPlugin: 'readonly',
    defineNuxtComponent: 'readonly',
    defineEventHandler: 'readonly',
    useRuntimeConfig: 'readonly',
    useNuxtApp: 'readonly',
    useRoute: 'readonly',
    useRouter: 'readonly',
    useHead: 'readonly',
    useFetch: 'readonly',
    useAsyncData: 'readonly',
    createError: 'readonly',
    readMultipartFormData: 'readonly',
    $fetch: 'readonly',
    definePageMeta: 'readonly',
    navigateTo: 'readonly',
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    // Single-word component names are used throughout this project
    'vue/multi-word-component-names': 'off',
  },
}
