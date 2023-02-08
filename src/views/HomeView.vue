<script setup>

import { ref } from 'vue'

import Sidebar from "../components/sidebar/Sidebar.vue";
import Li from "../components/sidebar/Li.vue";
import Navbar from "../components/navbar/Navbar.vue"
import Content from "../components/shared/Content.vue"

const sidebarItems = ref([
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
    route: 'dashboard'
  },
])


</script>


<template>
  <div class="bg-gray-100">

    <Sidebar>
      <template #logo>
        <h1 class="font-bold text-4xl">LOGO</h1>
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

    <Navbar></Navbar>

    <Content>
      <!-- <Card>

        <AdminTable />

      </Card> -->

      <router-view />
    </Content>
  
  </div>
</template>

