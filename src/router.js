import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import register from './components/register.vue'
import login from './components/login.vue'
import wallets from './components/wallets.vue'
import createwallet from './components/createwallet.vue'
import dashboard from './components/dashboard.vue'
import settings from './components/settings.vue'
import reset from './components/reset.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/wallet',
      name: 'wallets',
      component: wallets
    },
    {
      path: '/wallet/create',
      name: 'createwallet',
      component: createwallet
    },
    {
      path: '/wallet/dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings
    },
    {
      path: '/reset',
      name: 'reset',
      component: reset
    }
  ]
})
