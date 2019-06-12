import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1
}

const getters = {
  count: (state) => {
    return state.count += 50
  }
}

const mutations = {
  add (state, n) {
    state.count += n
  },
  reduce (state, n) {
    state.count -= n
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters
})