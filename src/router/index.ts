import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Documents from '../views/Documents.vue'
import Settings from '../views/Settings.vue'
import Budgets from '../views/Budgets.vue'
import Categories from '../views/Categories.vue'
import Users from '../views/Users.vue'
import Login from '../views/Login.vue'
import Fints from '../views/Fints.vue'
import Bankaccounts from '../views/Bankaccounts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/accounts',
    name: 'Bankkonten',
    component: Bankaccounts,
    meta: {
      requireAuth: true
    }
  },
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
   },
   {
      path: '/budgets',
      name: 'Budgets',
      component: Budgets,
      meta: {
         requireAuth: true
      }
   },
   {
      path: "/users",
      name: "Benutzer",
      component: Users,
      meta: {
         requireAuth: true
      }
   },
   {
      path: "/fints",
      name: "Fints",
      component: Fints,
      meta: {
         requireAuth: true
      }
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
   scrollBehavior() {
      return {x: 0, y: 0}
   }
})

const getToken = (key: string): string => {
  return Vue.cookies.get(key) as string
}

router.beforeEach(async (to, from, next) => {
    const access = {
      "granted": {},
      "denied": {
         path: '/login',
         query: {
           redirect: (to.fullPath) ? to.fullPath : "/"
         }
      }
    }

  if (to.matched.some(record => (record.meta.requireAuth === true))){
    const token = getToken('token')
    if (token !== null) {
      next(access.granted)
    }else{
      next(access.denied)
    }
  }else{
    next(access.granted)
  }
})

export default router
