/**
 * Provides the v-scroll-to directive used by pages/carta.vue
 * and components/NuestrasEspecialidades.vue as a replacement
 * for the Vue 2 vue-scrollto package.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scroll-to', {
    mounted(el, binding) {
      el.addEventListener('click', () => {
        const target =
          typeof binding.value === 'string'
            ? document.querySelector(binding.value)
            : null
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      })
    },
  })
})
