import Vue from 'vue'
import Router from 'vue-router'
import { Login } from 'pages/'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    hidden: true,
    component: Login
  }
]

export default new Router({
  routes,
  // 判断模式
  // strict: process.env.NODE_ENV !== 'production'
})