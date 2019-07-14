import clonedeep from 'lodash.clonedeep'

export const state = {
  user: {}
}

export const actions = {
  twitterLogin({ commit }) {
    const provider = new this.$firebase.auth.TwitterAuthProvider()
    this.$auth.signInWithRedirect(provider)
  },
  googleLogin({ commit }) {
    const provider = new this.$firebase.auth.GoogleAuthProvider()
    this.$auth.signInWithRedirect(provider)
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = clonedeep(user)
  }
}
