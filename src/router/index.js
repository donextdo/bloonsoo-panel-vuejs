import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
// import HotelsView from '../views/HotelsView.vue'
import BookingView from '../views/BookingView.vue'
import hotelRoutes from '../views/HotelsView'
import store from '../store'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: {
      name: 'dashboard'
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardView
      },
      ...hotelRoutes,
      {
        path: '/bookings',
        name: 'bookings',
        component: BookingView
      },
    ]
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  
  await store.dispatch('getAuthUser')
  const user = store.state.user

  if(to.name !== 'login' && !user) {
    next({name: 'login'})
  }
  else next()

})

export default router
