import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from '#app'
import { useAppStore } from '~/stores/app'

export default defineNuxtRouteMiddleware((to) => {
  const { $pinia } = useNuxtApp()
  const store = useAppStore($pinia)

  const isLoginPage = to.path === '/adminsala/login'

  if (!store.user && !isLoginPage) {
    return navigateTo('/adminsala/login')
  }

  if (store.user && isLoginPage) {
    return navigateTo('/adminsala')
  }
})
