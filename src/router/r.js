import Vue from 'vue'
import Router from 'vue-router'
import P1 from '@/components/p1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'index'}
    },
    {
      path: '/index',
      name: 'index',
      component: P1
    }
  ]
})
