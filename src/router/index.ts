import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Documents from '../views/Documents.vue'
import Settings from '../views/Settings.vue'
import Categories from '../views/Categories.vue'
import Login from '../views/Login.vue'
import api from '../plugins/api';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Übersicht',
    component: Dashboard,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/docs/:account',
    name: 'Belege',
    component: Documents,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/settings',
    name: 'Einstellungen',
    component: Settings,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/categories',
    name: 'Kategorien',
    component: Categories,
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const validateToken = async (token: string) => {
  const res = await api.post('/validate', {token: token})
  if (res.status === 200) {
    return true
  }else{
    return false
  }
}

router.beforeEach(async (to, from, next) => {
    const access = {
      "granted": {},
      "denied": {
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      }
    }

  if (to.matched.some(record => (record.meta.requireAuth))){
    const token = Vue.cookies.get('token') as string

    if (token !== null) {
      const status = await validateToken(token)
      console.log(status)
      next(
        (status === true) ? access.granted : access.denied
      )
    }else{
      next(access.denied)
    }
  }else{
    next(access.granted)
  }
})

export default router
