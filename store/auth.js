export const state = {
  user: {}
}

export const actions = {
  async twitterLogin({ commit }) {
    const provider = new this.$firebase.auth.TwitterAuthProvider()
    const res = await this.$auth.signInWithPopup(provider)
    commit('setUser', res.user)
  },
  async googleLogin({ commit }) {
    const provider = new this.$firebase.auth.GoogleAuthProvider()
    console.log(provider)
    const res = await this.$auth.signInWithPopup(provider)
    commit('setUser', res.user)
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}
