export const strict = false

export const state = () => ({
  user: null,
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}

export const actions = {
  logout(state) {
    state.commit('SET_USER', null)
  },
  login(state, user) {
    state.commit('SET_USER', user)
  },
}
