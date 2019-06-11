import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'
import Hh from '@/components/Hh'
import Params from '@/components/Params'
import Error from '@/components/Error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: {
        default: HelloWorld,
        left: Hi,
        right: Hh
      }
    },
    {
      path: '/reverse',
      name: 'HelloWorld',
      components: {
        default: HelloWorld,
        left: Hh,
        right: Hi
      }
    },
    {
      path: '/params/:id/:msg',
      name: 'params',
      component: Params,
      alias: '/pa/:id/:msg',
      beforeEnter: (to, from, next) => {
        console.log(to)
        console.log(from)
        // next控制跳转，true，false， path
        next()
      }
    },
    {
      path: '/goHome',
      redirect: '/'
    },
    {
      path: '/goParams/:id/:msg',
      redirect: '/params/:id/:msg'
    },
    {
      path: '*',
      component: Error
    }
  ]
})
