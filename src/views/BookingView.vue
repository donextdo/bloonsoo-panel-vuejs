<script setup>
import { ref, inject, onMounted } from 'vue'
import { useStore } from 'vuex'
import Card from '../components/shared/Card.vue'
import Table from '../components/shared/table/Table.vue'
import TableHead from '../components/shared/table/TableHead.vue'
import TableCell from "../components/shared/table/TableCell.vue";
import TableRow from "../components/shared/table/TableRow.vue";

const axios = inject('axios')
const store = useStore()

const bookings = ref([])

onMounted( async () => {
    const {data} = await axios.get('/api/booking', {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    console.log(data)
    bookings.value = data
})

</script>

<template>
    <Card>
        <div class="w-full flex flex-col">

            <Table>

                <template #thead>
                <TableHead>ID</TableHead>
                <TableHead>User Id</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Arrival</TableHead>
                <TableHead empty>Actions</TableHead>
                </template>

                <template #tbody>
                
                <TableRow v-for="(book, index) in bookings" :key="index">
                
                    <TableCell>
                        {{ book._id }}
                    </TableCell>

                    <TableCell>
                        {{ book.user_id }}
                    </TableCell>

                    <TableCell>
                        {{ book.hotel_id.property_name }}
                    </TableCell>

                    <TableCell>
                        {{ `${book.first_name}, ${book.last_name}` }}
                    </TableCell>

                    <TableCell>
                        {{ book.mobile }}
                    </TableCell>

                    <TableCell>
                        {{ book.email }}
                    </TableCell>

                    <TableCell>
                        {{ book.total }}
                    </TableCell>

                    <TableCell>
                        {{ book.arrival_time }}
                    </TableCell>

                    <TableCell>
                    <div class="w-full flex items-center gap-3">
                        <router-link 
                        :to="{name: '', params: {}}"
                        class="px-4 py-1 text-xs font-semibold bg-gray-800 text-white rounded-md">
                            View
                        </router-link>

                        <router-link 
                        :to="{name: '', params: {}}"
                        class="px-4 py-1 text-xs font-semibold bg-blue-600 text-white rounded-md">
                            Rooms
                        </router-link>
                        
                        <button 
                        v-if="hotel.status === 'pending'"
                        class="px-4 py-1 text-xs font-semibold bg-green-600 text-white rounded-md">
                            Approve
                        </button>

                        <button
                        class="px-4 py-1 text-xs font-semibold bg-blue-800 text-white rounded-md">
                            Publish
                        </button>

                        <button 
                        class="px-4 py-1 text-xs font-semibold bg-red-500 text-white rounded-md">
                            Unpublish
                        </button>

                        <button class="px-4 py-1 text-xs font-semibold bg-red-800 text-white rounded-md">
                            Delete
                        </button>



                    </div>
                </TableCell>

                </TableRow>

                </template>

            </Table>

            </div>
    </Card>
</template>