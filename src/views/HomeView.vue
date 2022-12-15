<script setup>

import { ref } from 'vue'

import Sidebar from "../components/sidebar/Sidebar.vue";
import Li from "../components/sidebar/Li.vue";
import Navbar from "../components/navbar/Navbar.vue"
import Content from "../components/shared/Content.vue"
import Card from '../components/shared/Card.vue'
import AdminTable from '../components/admin/AdminTable.vue'


</script>


<template>
  <div class="bg-gray-100">

    <Sidebar>
      <template #logo>
        <h1 class="font-bold text-4xl">LOGO</h1>
      </template>

      <template #links>
        <Li> Dashboard </Li>
        <Li> Dashboard </Li>
        <Li> Dashboard </Li>
        <Li> Dashboard </Li>
        <Li> Dashboard </Li>
      </template>
    </Sidebar>

    <Navbar></Navbar>

    <Content>
      <Card>

        <AdminTable />

      </Card>
    </Content>
  
  </div>
</template>

