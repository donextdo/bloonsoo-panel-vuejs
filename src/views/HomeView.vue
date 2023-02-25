<script setup>

import { ref } from 'vue'

import Sidebar from "../components/sidebar/Sidebar.vue";
import Li from "../components/sidebar/Li.vue";
import Navbar from "../components/navbar/Navbar.vue"
import Content from "../components/shared/Content.vue"
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

const store = useStore()
const { user } = store.state
const router = useRouter()

const sidebarItems = ref( user.role == 'admin' ? [
  {
    title: 'Dashboard',
    icon: 'fa-solid fa-chart-line',
    route: 'dashboard'
  },
  {
    title: 'Hotels',
    icon: 'fa-solid fa-hotel',
    route: 'hotels'
  },
  {
    title: 'Bookings',
    icon: 'fa-solid fa-bookmark',
    route: 'bookings'
  },
  // {
  //   title: 'Users',
  //   icon: 'fa-solid fa-users',
  //   route: 'dashboard'
  // },
  {
    title: 'Commission',
    icon: 'fa-solid fa-coins',
    route: 'commission'
  }
] : 
[
  {
    title: 'Dashboard',
    icon: 'fa-solid fa-chart-line',
    route: 'dashboard'
  },
  {
    title: 'Hotels',
    icon: 'fa-solid fa-hotel',
    route: 'hotels'
  },
  {
    title: 'Bookings',
    icon: 'fa-solid fa-bookmark',
    route: 'bookings'
  }
])


const logout = () => {
  store.commit('setUser', null)
  localStorage.removeItem('token')
  router.push({name: 'login'})
}


</script>


<template>
  <div class="bg-gray-100">

    <Sidebar>
      <template #logo>
        <img src="../assets/logo.png" alt="" class="w-4/5 object-contain">
      </template>

      <template #links>

        <Li 
        v-for="(item, index) in sidebarItems" :key="index"
        :icon="item.icon" :title="item.title" :routeName="item.route"/>

        <!-- <Li> 
          <router-link :to="{name: 'hotels'}">
            Hotels
          </router-link>  
        </Li>

        <Li> 
          <router-link :to="{name: 'bookings'}">
            Bookings
          </router-link>  
        </Li> -->

      </template>
    </Sidebar>

    <Navbar>

      <div class="w-full h-full flex items-center justify-between">
        <h4 class="text-base text-gray-600 font-semibold">
          {{ user.role == 'admin' ? 'ADMIN' : 'HOTEL ADMIN' }}
        </h4>


        <button 
        @click="logout"
        class="py-2 px-6 bg-slate-800 text-white text-sm font-semibold rounded-md">
          Logout
        </button>

      </div>

    </Navbar>

    <Content>
      <!-- <Card>

        <AdminTable />

      </Card> -->

      <router-view />
    </Content>
  
  </div>
</template>

