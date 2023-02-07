<script setup>

import { ref } from 'vue'

import Sidebar from "../components/sidebar/Sidebar.vue";
import Li from "../components/sidebar/Li.vue";
import Navbar from "../components/navbar/Navbar.vue"
import Content from "../components/shared/Content.vue"
import AdminTable from '../components/admin/AdminTable.vue'


</script>


<template>
  <div class="bg-gray-100">

    <Sidebar>
      <template #logo>
        <h1 class="font-bold text-4xl">LOGO</h1>
      </template>

      <template #links>

        <Li> 
          <router-link :to="{name: 'dashboard'}">
            Dashboard
          </router-link>  
        </Li>

        <Li> 
          <router-link :to="{name: 'hotels'}">
            Hotels
          </router-link>  
        </Li>

        <Li> 
          <router-link :to="{name: 'bookings'}">
            Bookings
          </router-link>  
        </Li>

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

