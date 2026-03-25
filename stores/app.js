import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null,
    menuOpen: false,
    showAlergicModal: false,
    imageUrls: {},
    editItem: false,
    activeLanguage: 'es',
    textos: {
      introWeb: '',
      menuDegustacion: '',
      menuDegustacionPrecio: '',
    },
  }),
  actions: {
    login(user) {
      this.user = user
    },
    logout() {
      this.user = null
    },
    loadTxt(data) {
      this.textos = { ...data }
    },
    setEditItem(item) {
      this.editItem = item
    },
    changeLanguage(lang) {
      this.activeLanguage = lang
    },
    openMenu() {
      this.menuOpen = true
    },
    closeMenu() {
      this.menuOpen = false
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    toggleAlergicModal() {
      this.showAlergicModal = !this.showAlergicModal
    },
    setImageUrl(fileName, url) {
      this.imageUrls = { ...this.imageUrls, [fileName]: url }
    },
    loadImageUrls(urls) {
      this.imageUrls = urls
    },
  },
  persist: true,
})
