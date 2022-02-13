export const strict = false

export const state = () => ({
  user: null,
  menuOpen: false,
  editItem: false,
  activeLanguage: 'es',
  textos: {
    introWeb: '',
    menuDegustacion: '',
    menuDegustacionPrecio: '',
  },
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  LOAD_TXT(state, data) {
    state.textos = { ...data }
  },
  SET_EDIT_ITEM(state, item) {
    state.editItem = item
  },
  CHANGE_LANGUAGE(state, lang) {
    state.activeLanguage = lang
  },
  OPEN_MENU(state) {
    state.menuOpen = true
  },
  CLOSE_MENU(state) {
    state.menuOpen = false
  },
  TOGGLE_MENU(state) {
    state.menuOpen = !state.menuOpen
  },
}

export const actions = {
  logout(state) {
    state.commit('SET_USER', null)
  },
  loadTxt(state, data) {
    state.commit('LOAD_TXT', data)
  },
  changeLanguage(state, data) {
    state.commit('CHANGE_LANGUAGE', data)
  },
  login(state, user) {
    state.commit('SET_USER', user)
  },
  toggleMenu(state) {
    state.commit('TOGGLE_MENU')
  },
  closeMenu(state) {
    state.commit('CLOSE_MENU')
  },
  setEditItem(state, item) {
    state.commit('SET_EDIT_ITEM', item)
  },
}
