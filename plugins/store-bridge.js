import { useAppStore } from '~/stores/app'

/**
 * Provides a Vuex-compatible $store shim backed by Pinia.
 * This allows all existing components using this.$store.state.X
 * and this.$store.dispatch('action', payload) to work unchanged.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.globalProperties.$store = {
    get state() {
      return useAppStore()
    },
    dispatch(action, payload) {
      const store = useAppStore()
      if (typeof store[action] === 'function') {
        return store[action](payload)
      }
    },
    commit(mutation, payload) {
      const store = useAppStore()
      if (typeof store[mutation] === 'function') {
        return store[mutation](payload)
      }
    },
  }
})
