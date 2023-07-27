<script setup>

import { ref, inject, onMounted } from "vue";

import Sidebar from "../components/sidebar/Sidebar.vue";
import Li from "../components/sidebar/Li.vue";
import Navbar from "../components/navbar/Navbar.vue"
import Content from "../components/shared/Content.vue"
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
const axios = inject("axios");
const store = useStore()
const { user } = store.state
const router = useRouter()
const addRadius = ref("");

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
  {
    title: 'Users',
    icon: 'fa-solid fa-users',
    route: 'users'
  },
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

const saveToDatabase = () => {
  const radius = addRadius.value
console.log("radius : ", radius)
  // Make a POST request to the backend API to save the radius value in the database
  axios.post(`/api/radius`, { radius: radius })
    .then(response => {
      console.log('Data saved successfully!', response.data);
      // Optionally, you can display a success message or perform other actions
    })
    .catch(error => {
      console.error('Error saving data:', error);
      // Handle error cases here
    });
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

   <!-- radius -->
   <h3 class="text-lg font-semibold text-gray-800">
                    Radius:
                </h3>
                <input type="number" v-model="addRadius"
                    class="px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none" />
                    <button @click="saveToDatabase" clas="bg-slate-800 text-white text-sm font-semibold rounded-md" >Save to Database</button>
        <!-- radius -->
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

