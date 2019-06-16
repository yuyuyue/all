### vuex基本用法
- state 访问对象状态，控制数据共享

- mutations 同步修改状态

- getters 计算属性过滤

- actions异步修改状态

- module模块组

- el: #root 根节点
- App component + vue-router +vuex 混合应用

new Vue({
  el: '#app',
  render: h => h(App)
})



- vue难点 数据管理
1. 组件状态 data () {}
2. 兄弟组价共享状态 登录功能，需要使用props
3. 共享状态 vuex

- 当页面上多个组件共享状态时，需要将需要复用的数据放在父组件的data中，通过props传递，通过on和emit来修改数据

#### vue 开发 两部分
组件开发 vuex 数据管理 应用程序的数据流

store

new Vuex.Store({
  state
})

读写状态 组件 地方
读 this.$store.state.data
写 actiongs, mutations, getters

vuex 不是什么时候都需要,小项目不需要，大项目离不开
公司的概念
CEO  State 100w
财务 mutations 审核对状态的修改是否被允许，唯一修改状态

- Vue 实现核心的MVVM, 通过Vue.use() 插入进去
  this.$store
  this.$router

写