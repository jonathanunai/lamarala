export const strict = false

export const state = () => ({
  user: null,
  menuOpen: false,
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
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
  login(state, user) {
    state.commit('SET_USER', user)
  },
  toggleMenu(state) {
    state.commit('TOGGLE_MENU')
  },
}
