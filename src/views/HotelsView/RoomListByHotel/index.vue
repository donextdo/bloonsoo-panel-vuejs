<script setup>
import { ref, inject, onMounted } from 'vue'
import Table from '../../../components/shared/table/Table.vue'
import TableHead from '../../../components/shared/table/TableHead.vue'
import TableCell from "../../../components/shared/table/TableCell.vue";
import TableRow from "../../../components/shared/table/TableRow.vue";
import Spinner from '../../../components/Spinner/Spinner.vue'
import { useStore } from 'vuex'
import { frontUrl } from '../../../config/config'
import { useRoute } from 'vue-router'

const axios = inject('axios')
const store = useStore()
const { user } = store.state
const route = useRoute()

const rooms = ref([])
const loading = ref(false)

onMounted( async () => {

    loading.value = true

    const {data} = await axios.get(`/api/rooms/bypropertyid/${route.params.id}`)

    rooms.value = data

    console.log(rooms.value)

    loading.value = false
})

// const getStatusColor = (status) => {
//     if(status === 'active'){
//         return 'bg-green-400'
//     }
//     else if(status === 'pending'){
//         return 'bg-yellow-500'
//     }
//     else {
//         return 'bg-red-500'
//     }
// }

</script>

<template>
    
    <div class="w-full flex flex-col">

        <Spinner v-if="loading" class="mx-auto"/>

        <Table v-else>

            <template #thead>
                <TableHead>
                    Room Name
                </TableHead>

                <TableHead>
                    Room Type
                </TableHead>

                <TableHead>
                    Guests
                </TableHead>

                <TableHead>
                    Rooms
                </TableHead>

                <TableHead>
                    Beds
                </TableHead>

                <TableHead>
                    Room Size
                </TableHead>

                <TableHead>
                    Price
                </TableHead>

                <TableHead empty>
                    Breakfast
                </TableHead>

                <TableHead empty>
                    Actions
                </TableHead>
            </template>

            <template #tbody>
            
            <TableRow v-for="(room, index) in rooms" :key="index">

                <TableCell>
                    <a :href="`${frontUrl}/hotels/${room.property_id}`" target="_blank" 
                    rel="noopener noreferrer" 
                    class="text-blue-900 font-semibold">
                        {{ room.room_name }}
                    </a>
                </TableCell>

                <TableCell>
                    {{ room.room_type }}
                </TableCell>

                <TableCell>
                    {{ room.guests }}
                </TableCell>

                <TableCell>
                    {{room.nbr_of_rooms}}
                </TableCell>

                <TableCell>
                    <div 
                    v-for="(bed,index) in room?.beds" :key="index"
                    :class="room?.beds.length > 1 && 'mb-2'"
                    class="w-60 grid grid-cols-5">
                        <p class="col-span-4 max-w-xs">{{ bed.bed_type }}</p>
                        <p class="ml-auto">{{ bed.no_of_beds }}</p>
                    </div>
                </TableCell>

                <TableCell>
                    {{ room.room_size }}
                </TableCell>

                <TableCell>
                    {{ room.price_for_one_night }}
                </TableCell>

                <TableCell>
                    {{ room.is_breakfast_available ? "Available" : 'Not Available' }}
                </TableCell>

                <TableCell>
                    <div class="w-full flex items-center gap-3">
                        <!-- <router-link 
                        :to="{name: 'hotelDetails', params: {id: hotel._id}}"
                        class="px-4 py-1 text-xs font-semibold bg-gray-800 text-white rounded-md">
                            View
                        </router-link> -->

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
