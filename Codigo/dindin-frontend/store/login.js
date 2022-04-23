export const state = () => ({
    token: null,
})
  
export const mutations = {
    LOGIN(state, token) {
      state.token = token
    }
}
  
export const actions = {
    userLogin({ commit }, { loginData, router, axios }) {
      commit('LOGIN', loginData)
      router.push('/dashboard')
      
    },
    setToken({ commit }, token) {
      return commit('LOGIN', token)
    }
}
  
export const getters = {
    token(state) {
      return state.token
    },
}