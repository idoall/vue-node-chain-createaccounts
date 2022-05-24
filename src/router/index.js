import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MSHK from '@/components/MSHK'

Vue.use(Router)

export default new Router({
  base: process.env.NODE_ENV === 'production' ? '/vue-node-chain-createaccounts/' : '/',
  routes: [
    {
      path: '/',
      name: 'MSHK',
      component: MSHK
    }
  ]
})
