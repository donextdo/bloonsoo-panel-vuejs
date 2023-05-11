import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
// import HotelsView from '../views/HotelsView.vue'
import BookingView from '../views/BookingView.vue'
import CommissionView from '../views/CommissionView/CommissionView.vue'
import hotelRoutes from '../views/HotelsView'
import usersRoutes from '../views/UsersView'
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
      ...usersRoutes,
      {
        path: '/bookings',
        name: 'bookings',
        component: BookingView
      },
      {
        path: '/commission',
        name: 'commission',
        component: CommissionView
      }
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

router.beforeEach(async (to, from, next) => {

  const { currentHotel } = store.state

  if(
    (
      to.name === 'basicInformation' ||
      to.name === 'facilities' ||
      to.name === 'images' ||
      to.name === 'policies' ||
      to.name === 'payments'
    ) 
    && to.params.id && currentHotel?._id !== to.params.id ) 
  {
    await store.dispatch('getCurrentHotel', to.params.id)
    next()
  }
  else next()
})

export default router
