import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1
}

const getters = {
  count: (state) => {
    return state.count += 10
  }
}

const actions = {
  addAction (ctx) {
    console.log(ctx)
    ctx.commit('add', 10)
    setTimeout(() => {ctx.commit('reduce', 40),console.log('reduce')}, 4000)
    console.log('add')
  },
  reduceAction ({commit}) {
    commit('reduce', 10)
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

const moduleA = {
  state,
  mutations,
  getters,
  actions
}
export default new Vuex.Store({
  modules: {a: moduleA}
})