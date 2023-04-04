<script setup>
import { ref, inject, onMounted } from 'vue'
import Table from '../../../components/shared/table/Table.vue'
import TableHead from '../../../components/shared/table/TableHead.vue'
import TableCell from "../../../components/shared/table/TableCell.vue";
import TableRow from "../../../components/shared/table/TableRow.vue";
import { useStore } from 'vuex'
import { frontUrl } from '../../../config/config'

const axios = inject('axios')
const store = useStore()
const { user } = store.state

const hotels = ref([])

onMounted( async () => {

    const endpoint = user.role === 'admin' ? 'get/all' : 'get/my'

    const {data} = await axios.get(`/api/hotel/${endpoint}`, {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    hotels.value = data
})

const getStatusColor = (status) => {
    if(status === 'active'){
        return 'bg-green-400'
    }
    else if(status === 'pending'){
        return 'bg-yellow-500'
    }
    else {
        return 'bg-red-500'
    }
}

</script>

<template>
    
    <div class="w-full flex flex-col">

        <Table>

            <template #thead >
                <TableHead>
                    Property Name
                </TableHead>

                <TableHead>
                    Contact Name
                </TableHead>

                <TableHead>
                    Contact Mobile
                </TableHead>

                <TableHead>
                    Address
                </TableHead>

                <TableHead>
                    User
                </TableHead>

                <TableHead empty>
                    Status
                </TableHead>

                <TableHead empty>
                    Actions
                </TableHead>
            </template>

            <template #tbody>
            
            <TableRow v-for="(hotel, index) in hotels" :key="index">

                <TableCell>
                    <a :href="`${frontUrl}/hotel/${hotel._id}`" target="_blank" 
                    rel="noopener noreferrer" 
                    class="text-blue-900 font-semibold">
                        {{ hotel.property_name }}
                    </a>
                </TableCell>

                <TableCell>
                    {{ hotel.contact_name }}
                </TableCell>

                <TableCell>
                    {{ hotel.contact_phone_number }}
                </TableCell>

                <TableCell>
                    <p>{{hotel.property_address.street_address}},</p>
                    <p>{{hotel.property_address.country}}</p>
                    <!-- {{ `${hotel.property_address.street_address}, ${hotel.property_address.country}` }} -->
                </TableCell>

                <TableCell>
                    {{ hotel.user.username }}
                </TableCell>

                <TableCell>
                    <span 
                    :class="getStatusColor(hotel.status)"
                    class="px-2 py-[2px] rounded-full  text-black">
                        {{ hotel.status }}
                    </span>
                </TableCell>

                <TableCell>
                    <div class="w-full flex items-center gap-3">
                        <router-link 
                        :to="{name: 'hotelDetails', params: {id: hotel._id}}"
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
                        v-if="!hotel.is_open_to_bookings"
                        class="px-4 py-1 text-xs font-semibold bg-blue-800 text-white rounded-md">
                            Publish
                        </button>

                        <button 
                        v-if="hotel.is_open_to_bookings"
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
    
</template>