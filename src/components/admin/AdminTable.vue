<script setup>

import { ref } from 'vue'

import Table from '../shared/table/Table.vue'
import TableHead from '../shared/table/TableHead.vue'
import TableCell from "../shared/table/TableCell.vue";
import TableRow from "../shared/table/TableRow.vue";

const dataExample = ref([
  {
    name: "Lakshitha Maduranga",
    email: "lxkshitha@gmail.com",
    contact: "0775843987"
  },
  {
    name: "Henry Cavil",
    email: "henryc@gmail.com",
    contact: "258693542"
  },
  {
    name: "Tom Holland",
    email: "tom@gmail.com",
    contact: "+6358236258"
  },
  {
    name: "Chris Evans",
    email: "chris@gmail.com",
    contact: "+9685354422"
  }
])

</script>


<template>
    
    <div class="w-full flex flex-col">

        <div class="flex items-center justify-between">

            <button class="px-5 py-2 bg-black flex items-center text-white text-sm font-medium">
                helo
            </button>

        </div>

        <Table>

            <template #thead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
            </template>

            <template #tbody>
            
            <TableRow v-for="(item, index) in dataExample" :key="index">
            
                <TableCell>
                {{ item.name }}
                </TableCell>

                <TableCell>
                {{ item.email }}
                </TableCell>

                <TableCell>
                {{ item.contact }}
                </TableCell>

            </TableRow>

            </template>

        </Table>

    </div>

</template>